	<div class="chart-info">
		<h2 class="left"><? echo str_replace('::', ' - ', $cIn['name']) ?></h2>
		<? chartStt($cIn, $tb) ?>
		<style>.chart-stt{margin-top:25px}</style>
	</div>
	<div id="m_tab">
		<div class="m_tab">
			<div class="tab active" id="c-davison">Davison</div>
			<div class="tab" id="c-composite">Composite</div>
			<div class="tab" id="c-synastry">Synastry</div>
			<div class="tab" id="c-data">Data</div>
		</div>
		<div class="chart-canvas tab-index c-davison">
			<div class="chart-wheel">
				<img src='<? echo $asLink."/natal_wheel_1.php?rx1=$Drx1&rx2=$Drx2&p1=$Dser_L1&p2=$Dser_L2&hc1=$Dser_hc1&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
				<img src='<? echo $asLink."/chartwheel_natal_line.php?rx1=$Drx1&rx2=$Drx2&p1=$Dser_L1&p2=$Dser_L2&hc1=$Dser_hc1&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
			</div>
		</div>
		<div class="hide chart-canvas tab-index c-composite">
			<div class="chart-wheel">
				<img src='<? echo $asLink."/composite_wheel.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
				<img src='<? echo $asLink."/composite_aspect_grid.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
			</div>
		</div>
		<div class="hide chart-canvas tab-index c-synastry">
			<div class="chart-wheel">
				<img src='<? echo $asLink."/synastry_wheel.php?rx1=$Srx1&rx2=$Srx2&p1=$Sser_L1&p2=$Sser_L2&hc1=$Sser_hc1&hc2=$Sser_hc2&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
				<img src='<? echo $asLink."/synastry_aspect_grid.php?rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&hc2=$Sser_hc2&ubt1=$ubt1&ubt2=$ubt2" ?>'/>
			</div>
		</div>
		<div class="hide chart-canvas tab-index c-data">
			<div class="chart-date-p">
			</div>
		</div>

		<div class="hide chart-canvas tab-index c-transit">
			<div class="chart-date-t">
				<? echo strftime("<div class='date post-time right'><span class='day-txt'>%a</span> <span class='day'>%d</span> <span class='month'>%B</span> <span class='year'>%Y</span></div><div class='clearfixs'></div><div class='chart-date-t-title'><h4> $name3 </h4></div><div class='post-time-tz left'>%X (time zone = GMT $tz1 hours)</div>", mktime($hour3, $minute3, $secs, $start_month, $start_day, $start_year)) ?>
				<div class="clearfix"></div>
			</div>
			<img src='<? echo $asLink."/transit_aspect_grid_blue.php?rx1=$rx1&rx2=$rx3&p1=$ser_L1&p2=$ser_L3&hc1=$ser_hc1&hc2=$ser_hc3&ubt1=$ubt1&ubt2=$ubt3" ?>'/>
		</div>
	</div>

<? $sections = array('overview', 'simple', 'advanced'); ?>
