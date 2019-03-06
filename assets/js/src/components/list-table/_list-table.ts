/* =======================================
   LIST TABLE
   ======================================= */

import Settings from '../../config/_settings';
import Globals from './_globals';
import { Utils } from '../../utils/_utils';
import Tooltip from '../_tooltip';
import EnhancedSelect from '../_enhanced-select';
import { ActiveRow } from './_active-row';

export default class ListTable {
	
	settings: Settings;
	globals: Globals;
	tooltip: Tooltip;
	enhancedSelect: EnhancedSelect;
	doingAjax: any  = null;
	isRowExpanding = {};
	
	constructor(settingsObj: Settings, globalsObj: Globals, toolTipObj: Tooltip, enhancedSelectObj: EnhancedSelect) {
		
		this.settings = settingsObj;
		this.globals = globalsObj;
		this.tooltip = toolTipObj;
		this.enhancedSelect = enhancedSelectObj;
		
		// Bind events.
		this.events();
		
	}
	
	/**
	 * Bind List Table events
	 */
	events() {
		
		// Bind active class rows.
		ActiveRow.addActiveClassRow(this.globals.$atumTable);
		
		// Calculate compounded stocks.
		this.calculateCompoundedStocks();
		
		this.globals.$atumList
		
			//
			// Trigger expanding/collapsing event in inheritable products.
			// ------------------------------------------
			.on('click', '.calc_type .has-child', (evt: any) => {
				$(evt.currentTarget).closest('tr').trigger('atum-list-expand-row');
			})
			//
			// Triggers the expand/collapse row action
			//
			.on('atum-list-expand-row', 'tbody tr', (evt: any, expandableRowClass: string, stopRowSelector: string, stopPropagation: boolean) => {
				this.expandRow($(evt.currentTarget), expandableRowClass, stopRowSelector, stopPropagation);
			})
			
			//
			// Expandable rows' checkboxes.
			// ----------------------------
			.on('change', '.check-column input:checkbox', (evt: any) => this.checkDescendats( $(evt.currentTarget) ))
			
			//
			// "Control all products" button.
			// ------------------------------
			.on('click', '#control-all-products', (evt: any) => {
				
				let $button: JQuery = $(evt.currentTarget);
				
				$.ajax({
					url       : window['ajaxurl'],
					method    : 'POST',
					dataType  : 'json',
					beforeSend: () => $button.prop('disabled', true).after('<span class="atum-spinner"><span></span></span>'),
					data      : {
						token : $button.data('nonce'),
						action: 'atum_control_all_products',
					},
					success   : () => location.reload(),
				});
				
			});
		
		
		//
		// Global save for edited cells.
		// -----------------------------
		$('body').on('click', '#atum-update-list', (evt: any) => this.saveData( $(evt.currentTarget) ));
		
		
		//
		// Warn the user about unsaved changes before navigating away.
		// -----------------------------------------------------------
		$(window).bind('beforeunload', () => {
			
			if (!this.globals.$editInput.val()) {
				return;
			}
			
			// Prevent multiple prompts - seen on Chrome and IE.
			if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
				
				if (window['aysHasPrompted']) {
					return;
				}
				
				window['aysHasPrompted'] = true;
				setTimeout( () => window['aysHasPrompted'] = false, 900);
				
			}
			
			return false;
			
		})
		
		// Display hidden footer.
		.on('load', () => $('#wpfooter').show());
		
	}
	
	/**
	 * Send the ajax call and replace table parts with updated version
	 */
	updateTable() {
		
		if (this.doingAjax && this.doingAjax.readyState !== 4) {
			this.doingAjax.abort();
		}
		
		// Overwrite the filterData with the URL hash parameters
		this.globals.filterData = $.extend(this.globals.filterData, {
			view          : $.address.parameter('view') || '',
			product_cat   : $.address.parameter('product_cat') || '',
			product_type  : $.address.parameter('product_type') || '',
			supplier      : $.address.parameter('supplier') || '',
			extra_filter  : $.address.parameter('extra_filter') || '',
			paged         : $.address.parameter('paged') || '',
			order         : $.address.parameter('order') || '',
			orderby       : $.address.parameter('orderby') || '',
			search_column : $.address.parameter('search_column') || '',
			sold_last_days: $.address.parameter('sold_last_days') || '',
			s             : $.address.parameter('s') || '',
		});
		
		this.doingAjax = $.ajax({
			url       : window['ajaxurl'],
			dataType  : 'json',
			method    : 'GET',
			data      : this.globals.filterData,
			beforeSend: () => {
				this.tooltip.destroyTooltips();
				this.addOverlay();
			},
			// Handle the successful result.
			success   : (response: any) => {
				
				this.doingAjax = null;
				
				if (typeof response === 'undefined' || !response) {
					return false;
				}
				
				// Update table with the coming rows.
				if (typeof response.rows !== 'undefined' && response.rows.length) {
					this.globals.$atumList.find('#the-list').html(response.rows);
					this.restoreMeta();
				}
				
				// Change page url parameter.
				if (response.paged > 0) {
					$.address.parameter('paged', response.paged);
				}
				
				// Update column headers for sorting.
				if (typeof response.column_headers !== 'undefined' && response.column_headers.length) {
					this.globals.$atumList.find('tr.item-heads').html(response.column_headers);
				}
				
				// Update the views filters.
				if (typeof response.views !== 'undefined' && response.views.length) {
					this.globals.$atumList.find('.subsubsub').replaceWith(response.views);
				}
				
				// Update table navs.
				if (typeof response.extra_t_n !== 'undefined') {
					
					if (response.extra_t_n.top.length) {
						this.globals.$atumList.find('.tablenav.top').replaceWith(response.extra_t_n.top);
					}
					
					if (response.extra_t_n.bottom.length) {
						this.globals.$atumList.find('.tablenav.bottom').replaceWith(response.extra_t_n.bottom);
					}
					
				}
				
				// Update the totals row.
				if (typeof response.totals !== 'undefined') {
					this.globals.$atumList.find('tfoot tr.totals').html(response.totals);
				}
				
				// If there are active filters, show the reset button.
				if ($.address.parameterNames().length) {
					this.globals.$atumList.find('.reset-filters').removeClass('hidden');
				}
				
				// Regenerate the UI.
				this.tooltip.addTooltips();
				this.enhancedSelect.maybeRestoreEnhancedSelect();
				ActiveRow.addActiveClassRow(this.globals.$atumTable);
				this.removeOverlay();
				this.calculateCompoundedStocks();
				
				// Custom trigger after updating.
				this.globals.$atumList.trigger('atum-table-updated');
				
			},
			error     : () => this.removeOverlay(),
		});
		
	}
	
	/**
	 * Add the overlay effect while loading data
	 */
	addOverlay() {
		
		const $tableWrapper: any = $('.atum-table-wrapper');
		
		$tableWrapper.block({
			message   : null,
			overlayCSS: {
				background: '#000',
				opacity   : 0.5,
			},
		});
		
	}
	
	/**
	 * Remove the overlay effect once the data is fully loaded
	 */
	removeOverlay() {
		
		const $tableWrapper: any = $('.atum-table-wrapper');
		$tableWrapper.unblock();
		
	}
	
	/**
	 * Set the table cell value with right format
	 *
	 * @param jQuery        $metaCell  The cell where will go the value.
	 * @param String|Number value      The value to set in the cell.
	 */
	setCellValue($metaCell: JQuery, value: string) {
		
		let symbol: string      = $metaCell.data('symbol') || '',
		    currencyPos: string = this.globals.$atumTable.data('currency-pos');
		
		if (symbol) {
			value = currencyPos === 'left' ? symbol + value : value + symbol;
		}
		
		$metaCell.addClass('unsaved').text(value);
		
	}
	
	/**
	 * Restore the edited meta after loading new table rows
	 */
	restoreMeta() {
		
		let editedCols: any = this.globals.$editInput.val();
		
		if (editedCols) {
			
			editedCols = $.parseJSON(editedCols);
			
			$.each( editedCols, (itemId: string, meta: any) => {
				
				// Filter the meta cell that was previously edited.
				let $metaCell: JQuery = $('tr[data-id="' + itemId + '"] .set-meta');
				
				if ($metaCell.length) {
					
					$.each(meta, (key: string, value: any) => {
						
						$metaCell = $metaCell.filter('[data-meta="' + key + '"]');
						
						if ($metaCell.length) {
							
							this.setCellValue($metaCell, value);
							
							// Add the extra meta too.
							let extraMeta: any = $metaCell.data('extra-meta');
							
							if (typeof extraMeta === 'object') {
								
								$.each(extraMeta, (index: number, extraMetaObj: any) => {
									
									// Restore the extra meta from the edit input
									if (editedCols[itemId].hasOwnProperty(extraMetaObj.name)) {
										extraMeta[index]['value'] = editedCols[itemId][extraMetaObj.name];
									}
									
								})
								
								$metaCell.data('extra-meta', extraMeta);
								
							}
							
						}
						
					});
					
				}
				
			});
			
		}
		
	}
	
	/**
	 * Every time a cell is edited, update the input value
	 *
	 * @param jQuery $metaCell  The table cell that is being edited.
	 * @param jQuery $popover   The popover attached to the above cell.
	 */
	updateEditedColsInput($metaCell: JQuery, $popover: JQuery) {
		
		let editedCols: any  = this.globals.$editInput.val(),
		    itemId: number   = $metaCell.closest('tr').data('id'),
		    meta: string     = $metaCell.data('meta'),
		    symbol: string   = $metaCell.data('symbol') || '',
		    custom: string   = $metaCell.data('custom') || 'no',
		    currency: string = $metaCell.data('currency') || '',
		    value: any       = symbol ? $metaCell.text().replace(symbol, '') : $metaCell.text(),
		    newValue: any    = $popover.find('.meta-value').val();
		
		// Update the cell value.
		this.setCellValue($metaCell, newValue);
		
		// Initialize the JSON object.
		if (editedCols) {
			editedCols = $.parseJSON(editedCols);
		}
		
		editedCols = editedCols || {};
		
		if (!editedCols.hasOwnProperty(itemId)) {
			editedCols[itemId] = {};
		}
		
		if (!editedCols[itemId].hasOwnProperty(meta)) {
			editedCols[itemId][meta] = {};
		}
		
		// Add the meta value to the object.
		editedCols[itemId][meta] = newValue;
		editedCols[itemId][meta + '_custom'] = custom;
		editedCols[itemId][meta + '_currency'] = currency;
		
		// Add the extra meta data (if any).
		if ($popover.hasClass('with-meta')) {
			
			let extraMeta: any = $metaCell.data('extra-meta');
			
			$popover.find('input').not('.meta-value').each( (index: number, input: any) => {
				
				let value: any = $(input).val();
				editedCols[itemId][input.name] = value;
				
				// Save the meta values in the cell data for future uses.
				if (typeof extraMeta === 'object') {
					
					$.each(extraMeta, (index, elem) => {
						
						if (elem.name === input.name) {
							extraMeta[index]['value'] = value;
							
							return false;
						}
						
					});
					
				}
				
			});
			
		}
		
		this.globals.$editInput.val( JSON.stringify(editedCols) );
		this.globals.$atumList.trigger('atum-edited-cols-input-updated', [$metaCell]);
		
	}
	
	/**
	 * Check if we need to add the Update button
	 */
	maybeAddSaveButton() {
		
		let $tableTitle: JQuery = this.globals.$atumList.siblings('.wp-heading-inline');
		
		if (!$tableTitle.find('#atum-update-list').length) {
			
			$tableTitle.append($('<button/>', {
				id   : 'atum-update-list',
				class: 'page-title-action button-primary',
				text : this.settings.get('saveButton'),
			}));
			
			// Check whether to show the first edit popup.
			if (typeof this.settings.get('firstEditKey') !== 'undefined') {
				
				const swal: any = window['swal'];
				
				swal({
					title             : this.settings.get('important'),
					text              : this.settings.get('preventLossNotice'),
					type              : 'warning',
					confirmButtonText : this.settings.get('ok'),
					confirmButtonColor: '#00b8db',
				});
				
			}
		}
		
	}
	
	/**
	 * Save the edited columns
	 *
	 * @param jQuery $button The "Save Data" button.
	 */
	saveData($button: JQuery) {
		
		if (this.doingAjax && this.doingAjax.readyState !== 4) {
			this.doingAjax.abort();
		}
			
		let data: any = {
			token         : this.settings.get('nonce'),
			action        : 'atum_update_data',
			data          : this.globals.$editInput.val(),
			first_edit_key: null,
		};
		
		if (typeof this.settings.get('firstEditKey') !== 'undefined') {
			data.first_edit_key = this.settings.get('firstEditKey');
		}
		
		this.doingAjax = $.ajax({
			url       : window['ajaxurl'],
			method    : 'POST',
			dataType  : 'json',
			data      : data,
			beforeSend: () => {
				$button.prop('disabled', true);
				this.addOverlay();
			},
			success   : (response: any) => {
				
				if (typeof response === 'object' && typeof response.success !== 'undefined') {
					const noticeType = response.success ? 'updated' : 'error';
					Utils.addNotice(noticeType, response.data);
				}
				
				if (typeof response.success !== 'undefined' && response.success) {
					$button.remove();
					this.globals.$editInput.val('');
					this.updateTable();
				}
				else {
					$button.prop('disabled', false);
				}
				
				this.doingAjax = null;
				this.settings.delete('firstEditKey');
				
			},
			error     : () => {
				
				this.doingAjax = null;
				$button.prop('disabled', false);
				this.removeOverlay();
				
				this.settings.delete('firstEditKey');
		
			},
		});
		
	}
	
	/**
	 * Expand/Collapse rows with childrens
	 *
	 * @param jQuery  $row
	 * @param String  expandableRowClass
	 * @param String  stopRowSelector
	 * @param Boolean stopPropagation
	 *
	 * @return void|boolean
	 */
	expandRow($row: JQuery, expandableRowClass?: string, stopRowSelector?: string, stopPropagation?: boolean) {
		
		const rowId: number = $row.data('id');
		
		if (typeof expandableRowClass === 'undefined') {
			expandableRowClass = 'expandable';
		}
		
		if (typeof stopRowSelector === 'undefined') {
			stopRowSelector = '.main-row';
		}
		
		// Sync the sticky columns table.
		if (this.globals.$stickyCols !== null && (typeof stopPropagation === 'undefined' || stopPropagation !== true)) {
			
			let $siblingTable: JQuery = $row.closest('.atum-list-table').siblings('.atum-list-table'),
			    $syncRow: JQuery      = $siblingTable.find('tr[data-id=' + rowId.toString().replace('c', '') + ']');
			
			this.expandRow($syncRow, expandableRowClass, stopRowSelector, true);
			
		}
		
		// Avoid multiple clicks before expanding.
		if (typeof this.isRowExpanding[rowId] !== 'undefined' && this.isRowExpanding[rowId] === true) {
			return false;
		}
		
		this.isRowExpanding[rowId] = true;
		
		let $rowTable: JQuery   = $row.closest('table'),
		    $nextRow: JQuery    = $row.next(),
		    childRows: JQuery[] = [];
		
		if ($nextRow.length) {
			$row.toggleClass('expanded');
			this.tooltip.destroyTooltips();
		}
		
		// Loop until reaching the next main row.
		while (!$nextRow.filter(stopRowSelector).length) {
			
			if (!$nextRow.length) {
				break;
			}
			
			if (!$nextRow.hasClass(expandableRowClass)) {
				$nextRow = $nextRow.next();
				continue;
			}
			
			childRows.push($nextRow);
			
			if ( ($rowTable.is(':visible') && !$nextRow.is(':visible')) || (!$rowTable.is(':visible') && $nextRow.css('display') === 'none')) {
				$nextRow.addClass('expanding').show(300);
			}
			else {
				$nextRow.addClass('collapsing').hide(300);
			}
			
			$nextRow = $nextRow.next();
			
		}
		
		// Re-enable the expanding again once the animation is completed.
		setTimeout( () => {
			
			delete this.isRowExpanding[rowId];
			
			// Do this only when all the rows has been already expanded.
			if (!Object.keys(this.isRowExpanding).length && (typeof stopPropagation === 'undefined' || stopPropagation !== true)) {
				this.tooltip.addTooltips();
			}
			
			$.each(childRows, (index: number, $childRow: JQuery) => {
				$childRow.removeClass('expanding collapsing');
			});
			
		}, 320);
		
		this.globals.$atumList.trigger('atum-after-expand-row', [$row, expandableRowClass, stopRowSelector]);
		
	}
	
	/**
	 * Checks/Unchecks the descendants rows when checking/unchecking their container
	 *
	 * @param jQuery $parentCheckbox
	 */
	checkDescendats($parentCheckbox: JQuery) {
		
		let $containerRow: JQuery = $parentCheckbox.closest('tr');
		
		// Handle clicks on the header checkbox.
		if ($parentCheckbox.closest('td').hasClass('manage-column')) {
			// Call this method recursively for all the checkboxes in the current page.
			this.globals.$atumTable.find('tr.variable, tr.group').find('input:checkbox').change();
		}
		
		if (!$containerRow.hasClass('variable') && !$containerRow.hasClass('group')) {
			return;
		}
		
		let $nextRow: JQuery = $containerRow.next('.expandable');
		
		// If is not expanded, expand it
		if (!$containerRow.hasClass('expanded') && $parentCheckbox.is(':checked')) {
			$containerRow.find('.calc_type .has-child').click();
		}
		
		// Check/Uncheck all the children rows.
		while ($nextRow.length) {
			$nextRow.find('.check-column input:checkbox').prop('checked', $parentCheckbox.is(':checked'));
			$nextRow = $nextRow.next('.expandable');
		}
		
	}
	
	/**
	 * Calculate the compounded stock amounts for all the inheritable products
	 */
	calculateCompoundedStocks() {
	
		this.globals.$atumTable.find('.compounded').each( (index: number, elem: any) => {
			
			let $compoundedCell: JQuery = $(elem),
			    $row: JQuery            = $compoundedCell.closest('tr'),
			    $nextRow: JQuery        = $row.next('.expandable'),
			    compoundedAmt: number   = 0;
			
			if ($row.hasClass('expandable')) {
				return;
			}
			
			while ($nextRow.length) {
				
				const $stockCell = $nextRow.find('._stock .set-meta'),
				      stockValue = !$stockCell.length ? '0' : $stockCell.text();
				
				compoundedAmt += parseFloat(stockValue);
				$nextRow = $nextRow.next('.expandable');
				
			}
			
			$compoundedCell.text(compoundedAmt);
		
		});
		
	}
	
}
