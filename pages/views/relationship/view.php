<!-- 
<div class="alerts alert-warning">This tool is being developed.</div>
 -->

<form class="chart-inputs" action="?do=caculate" method="post">
<div class="col-lg-6 no-padding-left chart-inputs">
	<h3 class="bor">Person 1 data</h3>
	<? include 'pages/views/chartView.php' ?>
</div>

<div class="col-lg-6 no-padding-right chart-inputs">
	<h3 class="bor">Person 2 data</h3>
	<? $p = 2; include 'pages/views/chartView.php' ?>
</div>

<div class="clearfix"></div>
	<div class="add-form-submit center">
		<input type="reset" value="Reset"/>
		<input type="submit" value="Submit"/>
	</div>
</form>

<div class="my-charts my-<? echo $tb ?>-charts">
	<h3 class="bor">My charts</h3>
	<div class="charts-list">
<? $cList = $getRecord -> GET($tb, "`uid` = '{$u}' ", '`time` DESC', 10);
foreach ($cList as $cO) { ?>
	<div class="c-one" style="background-image:url('<? echo IMG ?>/bg/tile-bg-<? echo rand(1,8) ?>.jpg')">
		<div class="c-info"><a href="<? echo $rLink.'/'.$cO['uname'].'/'.$cO['n'] ?>">
			<div class="c-name"><? echo str_replace('::', ' - ', $cO['name']) ?></div>
			<div class="c-time"><? echo timeFormat($cO['time']) ?></div>
		</a></div>
	</div>
<? } ?>
	</div>
</div>
