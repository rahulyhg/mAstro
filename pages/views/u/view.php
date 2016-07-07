<? $uCharts = countRecord('chart', "`uid` = '{$uID}' ");
if ($uIn['friends']) $uFr = explode(',', $uIn['friends']);
else $uFr = array(); ?>

<div class="col-lg-9 u-main">
	<h3 class="bor">Wall messages</h3>
	<div class="u-wall">
		<div class="u-wone">
			<a data-online="<? echo $uFin['online'] ?>" href="<? echo $uFin['link'] ?>" class="u-fone left">
				<img src="<? echo $uFin['avatar'] ?>"/></a>
			</a>
			created a chart with your data "<a href="">Nguyeenx Minh Tus</a>"
		</div>
	</div>
</div>
<div class="col-lg-3 u-right">
	<a data-online="<? echo $uIn['online'] ?>" href="<? echo $uIn['link'] ?>" class="u-avt">
		<img src="<? echo $uIn['avatar'] ?>" class="u-avt-img"/>
	</a>
	<div class="u-sta">
		<ul class="stats">
			<li class="u-charts">
				<strong><? echo $uCharts ?></strong>
				charts
			</li>
		</ul>
	</div>
	<div class="u-fr">
		<h4 class="bor"><? echo count($uFr) ?> friends</h4>
	<? foreach ($uFr as $uFo) {
		$uFin = getUserInfo($uFo) ?>
		<a data-online="<? echo $uFin['online'] ?>" href="<? echo $uFin['link'] ?>" class="u-fone left">
			<img src="<? echo $uFin['avatar'] ?>"/>
		</a>
	<? } ?>
	</div>
</div>
