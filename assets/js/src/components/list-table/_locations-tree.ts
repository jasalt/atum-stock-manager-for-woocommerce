/* =======================================
   LOCATIONS TREE FOR LIST TABLES
   ======================================= */

/**
 * Third party plugins
 */
import '../../../vendor/jquery.easytree';

import Settings from '../../config/_settings';
import Globals from './_globals';
import Swal, { SweetAlertResult } from 'sweetalert2';
import Tooltip from '../_tooltip';
import WPHooks from '../../interfaces/wp.hooks';

export default class LocationsTree {
	
	locationsSet: string[] = [];
	toSetLocations: string[] = [];
	productId: number = null;
	$button: JQuery = null;
	wpHooks: WPHooks = window['wp']['hooks']; // WP hooks.
	
	constructor(
		private settings: Settings,
		private globals: Globals,
		private tooltip: Tooltip
	) {

		this.globals.$atumList.on( 'click', '.show-locations', ( evt: JQueryEventObject ) => {
			evt.preventDefault();
			this.showLocationsPopup( $( evt.currentTarget ) );
		} );
		
	}
	
	/**
	 * Opens a popup with the locations' tree and allows to edit locations
	 *
	 * @param jQuery $button
	 */
	showLocationsPopup( $button: JQuery ) {

		const $row: JQuery = $button.closest( 'tr' );

		this.$button = $button;
		this.productId = $row.data( 'id' );
		this.toSetLocations = [];
		this.locationsSet = [];

		const modalTitle: string = this.wpHooks.applyFilters( 'atum_LocationsTree_showPopupTitle', `${ this.settings.get( 'productLocations' ) }<br><small>(${ this.getProductTitle( $row ) })</small>`, $button );

		// Open the view popup.
		Swal.fire( {
			title             : modalTitle,
			html              : '<div id="atum-locations-tree" class="atum-tree"></div>',
			showCancelButton  : false,
			showConfirmButton : true,
			confirmButtonText : this.settings.get( 'editLocations' ),
			confirmButtonColor: 'var(--primary)',
			showCloseButton   : true,
			didOpen           : () => this.onOpenViewPopup(),
			willClose         : () => this.onCloseViewPopup(),
			background        : 'var(--atum-table-bg)',
		} )
		// Click on edit: open the edit popup.
		.then( ( result: SweetAlertResult ) => {

			if ( result.isConfirmed ) {
				this.openEditPopup( $button );
			}

		} );
		
	}
	
	/**
	 * Triggers when the view popup opens
	 */
	onOpenViewPopup() {

		const $locationsTreeContainer: JQuery = $( '#atum-locations-tree' );
		
		this.tooltip.destroyTooltips();

		$.ajax( {
			url       : window[ 'ajaxurl' ],
			dataType  : 'json',
			method    : 'post',
			data      : {
				action    : 'atum_get_locations_tree',
				token     : this.settings.get( 'nonce' ),
				product_id: this.productId,
			},
			beforeSend: () => $locationsTreeContainer.append( '<div class="atum-loading" />' ),
			success   : ( response: any ) => {

				if ( response.success === true ) {

					$locationsTreeContainer.html( response.data );

					// If answer is like <span class="no-locations-set">...  don't put easytree on work.
					// It will remove the span message.
					if ( ! ( response.data.indexOf( 'no-locations-set' ) > -1 ) ) {

						( <any> $locationsTreeContainer ).easytree();

						// Fill locationsSet.
						$( '#atum-locations-tree span[class^="cat-item-"], #atum-locations-tree span[class*="cat-item-"]' ).each( ( index: number, elem: Element ) => {

							const classList = $( elem ).attr( 'class' ).split( /\s+/ );

							$.each( classList, ( index: number, item: string ) => {
								if ( item.startsWith( 'cat-item-' ) ) {
									this.locationsSet.push( item );
								}
							} );

						} );
					}

				}
				else {
					$( '#atum-locations-tree' ).html( `<h4 class="color-danger">${ response.data }</h4>` );
				}

			},
		} );
		
	}

	/**
	 * Get the product title from the table row
	 *
	 * @param {JQuery} $row
	 */
	getProductTitle( $row: JQuery ): string {
		return $row.find( '.column-title' ).find( '.atum-title-small' ).length ? $row.find( '.column-title' ).find( '.atum-title-small' ).text().trim() : $row.find( '.column-title' ).text().trim();
	}
	
	/**
	 * Triggers when the view popup is closed
	 */
	onCloseViewPopup() {
		this.tooltip.addTooltips();
	}
	
	/**
	 * Opens the edit popup
	 *
	 * @param {JQuery} $button
	 */
	openEditPopup( $button: JQuery ) {

		const modalTitle: string = this.wpHooks.applyFilters(  'atum_LocationsTree_editPopupTitle', `${ this.settings.get( 'editProductLocations' ) }<br><small>(${ this.getProductTitle( $button.closest( 'tr' ) ) })</small>`, $button );

		Swal.fire( {
			title              : modalTitle,
			html               : '<div id="atum-locations-tree" class="atum-tree"></div>',
			text               : this.settings.get( 'textToShow' ),
			confirmButtonText  : this.settings.get( 'saveButton' ),
			confirmButtonColor : 'var(--primary)',
			showCloseButton    : true,
			showCancelButton   : true,
			showLoaderOnConfirm: true,
			customClass        : {
				popup: 'edit-locations-modal'
			},
			didOpen            : () => this.onOpenEditPopup(),
			preConfirm         : () => this.saveLocations(),
			background         : 'var(--atum-table-bg)',
			showClass          : {
				popup   : 'swal2-noanimation',
				backdrop: 'swal2-noanimation',
			},
		} )
		.then( ( result: SweetAlertResult ) => {

			if ( result.isConfirmed ) {
				Swal.fire( {
					title             : this.settings.get( 'done' ),
					icon              : 'success',
					text              : this.settings.get( 'locationsSaved' ),
					confirmButtonText : this.settings.get( 'ok' ),
					confirmButtonColor: 'var(--primary)',
					background        : 'var(--atum-table-bg)',
				} );
			}

		} );
		
	}
	
	/**
	 * Triggers when the edit popup opens
	 */
	onOpenEditPopup() {

		const $locationsTreeContainer: JQuery = $( '#atum-locations-tree' );

		$.ajax( {
			url       : window[ 'ajaxurl' ],
			dataType  : 'json',
			method    : 'post',
			data      : {
				action    : 'atum_get_locations_tree',
				token     : this.settings.get( 'nonce' ),
				product_id: -1, // Send -1 to get all the terms.
			},
			beforeSend: () => $locationsTreeContainer.append( '<div class="atum-loading" />' ),
			success   : ( response: any ) => {

				if ( response.success === true ) {

					$locationsTreeContainer.html( response.data );
					( <any> $locationsTreeContainer ).easytree();

					// Add instructions alert.
					$locationsTreeContainer.append( `<div class="alert alert-primary"><i class="atmi-info"></i> ${ this.settings.get( 'editLocationsInfo' ) }</div>` );

					this.bindEditTreeEvents( $locationsTreeContainer );

				}
			},
		} );
		
	}
	
	/**
	 * Saves the checked locations
	 *
	 * @return Promise
	 */
	saveLocations(): Promise<void> {

		return new Promise( ( resolve: Function ) => {
			
			// ["cat-item-40", "cat-item-39"] -> [40, 39]
			const toSetTerms = this.toSetLocations.map( ( elem: string ) => {
				return parseInt( elem.substring( 9 ) );
			} );

			$.ajax( {
				url     : window[ 'ajaxurl' ],
				dataType: 'json',
				method  : 'post',
				data    : {
					action    : 'atum_set_locations_tree',
					token     : this.settings.get( 'nonce' ),
					product_id: this.productId,
					terms     : toSetTerms,
				},
				success : ( response: any ) => {

					if ( response.success === true ) {

						if ( toSetTerms.length ) {
							this.$button.addClass( 'not-empty' );
						}
						else {
							this.$button.removeClass( 'not-empty' );
						}

					}
					else {
						Swal.showValidationMessage( response.data );
					}

					resolve();

				},
			} );

		} );
		
	}
	
	/**
	 * Bind the events for the editable tree
	 */
	bindEditTreeEvents( $locationsTreeContainer: JQuery ) {
		
		this.toSetLocations = this.locationsSet;

		// When clicking on link or icon, set node as checked.
		$locationsTreeContainer.find( 'a, .easytree-icon' ).click( ( evt: JQueryEventObject ) => {

			evt.preventDefault();

			let $this: JQuery       = $( evt.currentTarget ),
			    catItem: string     = '',
			    classList: string[] = $this.closest( '.easytree-node' ).attr( 'class' ).split( /\s+/ );

			$.each( classList, ( index: number, item: string ) => {
				if ( item.lastIndexOf( 'cat-item-', 0 ) === 0 ) {
					catItem = item;

					return false;
				}
			} );

			const $catItem: JQuery = $( `.${ catItem }` );

			$catItem.toggleClass( 'checked' );

			if ( $catItem.hasClass( 'checked' ) ) {
				this.toSetLocations.push( catItem );
			}
			else {

				const pos: number = this.toSetLocations.indexOf( catItem );

				if ( pos > -1 ) {
					this.toSetLocations.splice( pos, 1 );
				}

			}

		} );
		
		// Set class checked the actual values on load.
		$locationsTreeContainer.find( 'span[class^="cat-item-"], span[class*="cat-item-"]' ).each( ( index: number, elem: Element ) => {

			const classList: string[] = $( elem ).attr( 'class' ).split( /\s+/ ),
			      $node: JQuery       = $( elem );

			$.each( classList, ( index: number, className: string ) => {

				if ( className.startsWith( 'cat-item-' ) && $.inArray( className, this.locationsSet ) > -1 ) {
					$node.addClass( 'checked' );
				}

			} );

			// Open the node parent for all the checked nodes (if closed).
			if ( $node.hasClass( 'checked' ) ) {
				const $parentNode: JQuery = $node.closest( 'ul' ).parent( 'li' );
				if ( $parentNode.length ) {
					$parentNode.children( '.easytree-exp-c, .easytree-exp-cl' ).find( '.easytree-expander' ).click();
				}
			}

		} );
		
	}
	
}
