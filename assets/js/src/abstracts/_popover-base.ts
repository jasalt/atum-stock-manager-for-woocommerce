/* =======================================
 POPOVER BASE
 ======================================= */

import BsPopover from 'bootstrap/js/dist/popover'; // Bootstrap 5 popover

export default abstract class PopoverBase {

	abstract popoverClassName: string;

	/**
	 * Bind the popovers
	 *
	 * @param {JQuery} $popoverButtons The buttons where are attached the popovers.
	 */
	abstract bindPopovers( $popoverButtons: JQuery );

	/**
	 * Destroy the popovers
	 *
	 * @param {JQuery}   $popoverButton The button that holds the popover to destroy.
	 * @param {Function} callback       Optional. Any callback function that will be triggered after destroying.
	 */
	destroyPopover( $popoverButton: JQuery, callback?: Function ) {

		if ( $popoverButton.length ) {

			if ( $popoverButton.length > 1 ) {
				// Recursive call.
				$popoverButton.each( ( index: number, elem: Element ) => this.destroyPopover( $( elem ) ) );
			}
			else {

				// Only hide the popovers added by this component.
				if ( ! this.isValidPopover( $popoverButton ) ) {
					return;
				}

				const popover: BsPopover = BsPopover.getInstance( $popoverButton.get( 0 ) );

				if ( popover ) {
					popover.dispose();

					if ( callback ) {
						callback();
					}
				}

			}

		}

	}

	/**
	 * Hides a popover
	 *
	 * @param {JQuery} $popoverButton
	 */
	hidePopover( $popoverButton: JQuery ) {

		if ( ! $popoverButton.length || ! $( '.popover' ).length ) {
			return;
		}
		else if ( $popoverButton.length > 1 ) {
			// Recursive call.
			$popoverButton.each( ( index: number, elem: Element ) => this.hidePopover( $( elem ) ) );
		}
		else {

			// Only hide the popovers added by this component.
			if ( ! this.isValidPopover( $popoverButton ) ) {
				return;
			}

			const popover: BsPopover = BsPopover.getInstance( $popoverButton.get( 0 ) );

			if ( popover ) {
				popover.hide();
			}

		}

	}

	/**
	 * Check if the popover linked to the passed button belongs to the current component's context
	 *
	 * @param {JQuery} $popoverButton
	 *
	 * @return {boolean}
	 */
	isValidPopover( $popoverButton: JQuery ): boolean {

		const popoverId: string = $popoverButton.attr( 'aria-describedby' );

		if (  ! popoverId || typeof popoverId === 'undefined' ) {
			return false;
		}

		const $popover: JQuery = $( `#${ popoverId }` );

		return $popover.length && $popover.hasClass( this.popoverClassName );
	}
}