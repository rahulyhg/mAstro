<? if ($ubt1 == 0) { ?>
	<section id="house" class="hide">
		<div class="chart-report-head htitle"><? echo $lang['House position of planets'] ?></div>
		<div class="chart-report-content">
			<div class="chart-report-des"><? echo astro('house')['content'] ?></div>
<?	for ($i = 0; $i <= 9; $i++) {
		$h_pos = $house_pos1[$i];
		$hTitle = $pl_name[$i] . " in " . $house_name[$h_pos - 1].' house'; ?>
			<div class="paragraph" id="<? echo trendCode($hTitle) ?>" data-rid="<? echo astro(trendCode($hTitle))['id'] ?>" data-trans-num="<? echo countTrans(astro(trendCode($hTitle))['id']) ?>">
				<h3><b><? echo $lang[$pl_name[$i]].' '.$lang['as^in'].' '.$lang['house'].' '.$h_pos ?></b></h3>
				<div class="chart-paragraph-content"><? echo astro(trendCode($hTitle))['content'] ?></div>
			</div>
<? } ?>
		</div>
	</section>
<? } ?>
