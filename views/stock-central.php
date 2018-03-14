<?php
/**
 * View for the Stock Central page
 *
 * @since 0.0.1
 */

defined( 'ABSPATH' ) or die;
?>
<div class="wrap">
	<h1 class="wp-heading-inline">
		<?php echo apply_filters( 'atum/stock_central/title', __('Stock Central', ATUM_TEXT_DOMAIN) ) ?>

		<?php if ($is_uncontrolled_list): ?>
			<?php _e('(Uncontrolled)', ATUM_TEXT_DOMAIN) ?>
		<?php endif; ?>

		<a href="<?php echo $sc_url ?>" class="toggle-managed page-title-action"><?php echo $is_uncontrolled_list ? __('Show Controlled', ATUM_TEXT_DOMAIN) : __('Show Uncontrolled', ATUM_TEXT_DOMAIN) ?></a>
		<?php do_action('atum/list_table/page_title_buttons') ?>
	</h1>

	<hr class="wp-header-end">

	<div class="atum-list-wrapper" data-action="atum_fetch_stock_central_list" data-screen="<?php echo $list->screen->id ?>">
		
		<?php $list->views(); ?>

		<p class="search-box">
			<input type="search" name="s" class="atum-post-search" value="" placeholder="<?php _e('Search products...', ATUM_TEXT_DOMAIN) ?>">
			
			<?php if ( $ajax == 'no' ):?>
				<input type="submit" class="button search-submit" value="<?php _e('Search', ATUM_TEXT_DOMAIN) ?>">
			<?php endif;?>
		</p>
		
		<?php $list->display(); ?>
		
	</div>
</div>