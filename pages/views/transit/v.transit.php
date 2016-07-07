	<div class="chart-info">
		<h2><? echo $restored_name ?></h2>
		<? echo strftime("<div class='date post-time left'><span class='day-txt'>%a</span> <span class='day'>%d</span> <span class='month'>%B</span> <span class='year'>%Y</span></div>", mktime($hour2, $minute2, $secs, $start_month, $start_day, $start_year)) ?>
		<? chartStt($cIn) ?>
	</div>
	<div id="m_tab">
		<div class="m_tab">
			<div class="tab active" id="c-images">All</div>
			<div class="tab" id="c-transit">Transit</div>
<!--			<div class="tab" id="c-progressions">Progressions</div> -->
			<div class="tab" id="c-solar">Solar arcs</div>
		</div>
		<div class="chart-canvas tab-index c-images">
			<div class="chart-wheel">
				<img src='<? echo $asLink."/transit_prog_wheel.php?p1=$ser_L1&p2=$ser_L2&p3=$ser_L3&hc1=$ser_hc1" ?>'/>
			</div>
		</div>

<!--		<div class="hide chart-canvas tab-index c-progressions">
			<div class="chart-date-t">
				<? echo strftime("<div class='date post-time right'><span class='day-txt'>%a</span> <span class='day'>%d</span> <span class='month'>%B</span> <span class='year'>%Y</span></div><div class='clearfixs'></div><div class='chart-date-p-title'><h4> $name2 </h4></div><div class='post-time-tz left'>%X (time zone = GMT $tz1 hours)</div>", mktime($hour2, $minute2, $secs, $start_month, $start_day, $start_year)) ?>
				<div class="clearfix"></div>
			</div>
			<img src='<? echo $asLink."/prog_wheel.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&hc2=$ser_hc2&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
			<img src='<? echo $asLink."/prog_aspect_grid.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&hc2=$ser_hc2&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
		</div> -->

		<div class="hide chart-canvas tab-index c-transit">
			<div class="chart-date-t">
				<? echo strftime("<div class='date post-time right'><span class='day-txt'>%a</span> <span class='day'>%d</span> <span class='month'>%B</span> <span class='year'>%Y</span></div><div class='clearfixs'></div><div class='chart-date-t-title'><h4> $name3 </h4></div><div class='post-time-tz left'>%X (time zone = GMT $tz1 hours)</div>", mktime($hour3, $minute3, $secs, $start_month, $start_day, $start_year)) ?>
				<div class="clearfix"></div>
			</div>
			<img src='<? echo $asLink."/transit_wheel.php?rx1=$rx1&rx2=$rx3&p1=$ser_L1&p2=$ser_L3&hc1=$ser_hc1&hc2=$ser_hc3&ubt1=$ubt1&ubt2=$ubt3" ?>'/>
			<img src='<? echo $asLink."/transit_aspect_grid_blue.php?rx1=$rx1&rx2=$rx3&p1=$ser_L1&p2=$ser_L3&hc1=$ser_hc1&hc2=$ser_hc3&ubt1=$ubt1&ubt2=$ubt3" ?>'/>
		</div>

		<div class="hide chart-canvas tab-index c-solar">
			<div class="chart-date-t">
				<? echo strftime("<div class='date post-time right'><span class='day-txt'>%a</span> <span class='day'>%d</span> <span class='month'>%B</span> <span class='year'>%Y</span></div><div class='clearfixs'></div><div class='chart-date-t-title'><h4> $name4 </h4></div><div class='post-time-tz left'>%X (time zone = GMT $tz1 hours)</div>", mktime($hour2, $minute2, $secs, $start_month, $start_day, $start_year)) ?>
				<div class="clearfix"></div>
			</div>
			<img src='<? echo $asLink."/sa_wheel.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&hc2=$ser_hc2&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
			<img src='<? echo $asLink."/sa_aspect_grid.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&hc2=$ser_hc2&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
		</div>
	</div>

<? $sections = array('overview', 'transit'); ?>
