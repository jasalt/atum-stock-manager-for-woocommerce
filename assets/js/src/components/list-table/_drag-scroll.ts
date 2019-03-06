/* =======================================
   DRAG-SCROLL FOR LIST TABLES
   ======================================= */

import Globals from './_globals';
import Tooltip from '../_tooltip';
import dragscroll from '../../../vendor/dragscroll.min';
import Hammer from 'hammerjs/hammer.min';
import { Utils } from '../../utils/_utils';
import Popover from '../_popover';

export default class DragScroll {
	
	globals: Globals;
	tooltip: Tooltip;
	popover: Popover;
	
	constructor(globalsObj: Globals, tooltipObj: Tooltip, popoverObj: Popover) {
		
		this.globals = globalsObj;
		this.tooltip = tooltipObj;
		this.popover = popoverObj;
	
		// Load Hammer for table dragging functionality.
		this.globals.$atumList.on('atum-scroll-bar-loaded', () => this.loadHammer());
		
		// Add horizontal drag-scroll to table filters.
		this.initHorizontalDragScroll();
		
		// Re-add the horizontal drag-scroll when the List Table is updated.
		this.globals.$atumList.on('atum-table-updated', () => this.initHorizontalDragScroll());
	
	}
	
	loadHammer() {
		
		// Drag and drop scrolling on desktops.
		const hammertime: any = new Hammer(this.globals.$scrollPane.get(0), {});
		
		hammertime
			
			.on('panstart', () => {
				// As the popoover is not being repositioned when scrolling horizontally, we have to destroy it.
				this.popover.destroyPopover();
			})
			
			// Horizontal drag scroll (JScrollPane).
			.on('panright panleft', (evt) => {
				
				const velocityModifier = 10,
				      displacement     = this.globals.jScrollApi.getContentPositionX() - (evt.distance * (evt.velocityX / velocityModifier));
				
				this.globals.jScrollApi.scrollToX(displacement, false);
				
			})
			
			// Vertical drag scroll (browser scroll bar).
			.on('panup pandown', (evt) => {
				
				const velocityModifier = 10,
				      displacement     = $(window).scrollTop() - (evt.distance * (evt.velocityY / velocityModifier));
				
				$(window).scrollTop(displacement);
				
			});
		
	}
	
	/**
	 * Init horizontal scroll
	 */
	initHorizontalDragScroll() {
		
		this.addHorizontalDragScroll('stock_central_nav', false);
		this.addHorizontalDragScroll('filters_container', false);
		
		$(window).on('resize', () => {
			this.addHorizontalDragScroll('stock_central_nav', false);
			this.addHorizontalDragScroll('filters_container', false);
		});
		
		$('.nav-with-scroll-effect').css('visibility', 'visible').on('scroll', (evt: any) => {
			
			this.addHorizontalDragScroll($(evt.currentTarget).attr('id'), true);
			this.tooltip.destroyTooltips();
			
			Utils.delay( () => {
				this.tooltip.addTooltips();
			}, 1000);
			
		});
		
		dragscroll.reset();
		
	}
	
	/**
	 * Add horizontal scroll effect to menu views
	 */
	addHorizontalDragScroll(elementId: string, checkEnhanced: boolean) {
		
		const $nav: JQuery = $(`#${ elementId }`);
		
		if (!$nav.length) {
			return;
		}
		
		let $overflowOpacityRight: JQuery = $nav.find('.overflow-opacity-effect-right'),
		    $overflowOpacityLeft: JQuery  = $nav.find('.overflow-opacity-effect-left'),
		    $leftMax: number              = $nav ? $nav.get(0).scrollWidth : 0,
		    $left: number                 = $nav ? $nav.get(0).scrollLeft : 0,
		    $diff: number                 = $leftMax - $left;
		
		if ( checkEnhanced ) {
			(<any>$('.enhanced')).select2('close');
		}
		
		if ($diff === $('#' + elementId).outerWidth()) {
			$overflowOpacityRight.hide();
		}
		else {
			$overflowOpacityRight.show();
		}
		
		if ($left === 0) {
			$overflowOpacityLeft.hide();
		}
		else {
			$overflowOpacityLeft.show();
		}
		
		$nav.css('cursor', $overflowOpacityLeft.is(':visible') || $overflowOpacityRight.is(':visible') ? 'grab' : 'auto');
		
	}
	
}
