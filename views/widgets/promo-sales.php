<?php
/**
 * View for the ATUM Dashboard Promo Sales widget
 *
 * @since 1.4.0
 */
?>

<div class="stats-data-widget" data-widget="sales_data">

	<div class="data-filter">
		<select>
			<option value="this_month"><?php _e('This Month', ATUM_TEXT_DOMAIN) ?></option>
			<option value="previous_month"><?php _e('Previous Month', ATUM_TEXT_DOMAIN) ?></option>
			<option value="this_week"><?php _e('This Week', ATUM_TEXT_DOMAIN) ?></option>
			<option value="today"><?php _e('Today', ATUM_TEXT_DOMAIN) ?></option>
		</select>
	</div>

	<div class="data" data-value="today">

		<h3 class="widget-success"><?php echo $stats_today['value'] ?></h3>
		<h5><?php _e('Value', ATUM_TEXT_DOMAIN) ?></h5>

		<hr>

		<h3 class="widget-primary"><?php echo $stats_today['products'] ?></h3>
		<h5><?php _e('Products', ATUM_TEXT_DOMAIN) ?></h5>

	</div>

	<div class="data hidden" data-value="this_week">

		<h3 class="widget-success"><?php echo $stats_this_week['value'] ?></h3>
		<h5><?php _e('Value', ATUM_TEXT_DOMAIN) ?></h5>

		<hr>

		<h3 class="widget-primary"><?php echo $stats_this_week['products'] ?></h3>
		<h5><?php _e('Products', ATUM_TEXT_DOMAIN) ?></h5>

	</div>

	<div class="data hidden" data-value="this_month">

		<h3 class="widget-success"><?php echo $stats_this_month['value'] ?></h3>
		<h5><?php _e('Value', ATUM_TEXT_DOMAIN) ?></h5>

		<hr>

		<h3 class="widget-primary"><?php echo $stats_this_month['products'] ?></h3>
		<h5><?php _e('Products', ATUM_TEXT_DOMAIN) ?></h5>

	</div>

	<div class="data hidden" data-value="previous_month">

		<h3 class="widget-success"><?php echo $stats_previous_month['value'] ?></h3>
		<h5><?php _e('Value', ATUM_TEXT_DOMAIN) ?></h5>

		<hr>

		<h3 class="widget-primary"><?php echo $stats_previous_month['products'] ?></h3>
		<h5><?php _e('Products', ATUM_TEXT_DOMAIN) ?></h5>

	</div>

</div>
