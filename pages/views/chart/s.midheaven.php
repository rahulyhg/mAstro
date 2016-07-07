<? if ($ubt1 == 0) {
//	$s_pos = floor($hc1[10] / 30) + 1;
//	$mc = $sign_name[$s_pos];
	$mcCode = 'mc-'.trendCode($mc);
	$mcSunCode = $mcCode.'-sun-'.trendCode($sunSign); ?>
<section id="midheaven" class="hide">
	<div class="chart-report-head htitle"><? echo $lang['Midheaven'] ?></div>
	<div class="chart-report-content">
		<div class="chart-report-des"><? echo astro('mc')['content'] ?></div>
	<div class="module parallax">
		<div class="parallax-bg" style="background-image:url(<? echo zBg.'/zodiac-art-'.trendCode($mc).'.jpg' ?>)"></div>
		<div class="paragraph" id="<? echo $mcCode ?>" data-rid="<? echo astro($mcCode)['id'] ?>" data-trans-num="<? echo countTrans(astro($mcCode)['id']) ?>">
			<h3><b><? echo $lang['mc-before'] ?> <? echo $lang[$mc] ?> <? echo $lang['mc'] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro($mcCode)['content'] ?></div>
		</div>
	</div>
<!--		<div class="paragraph" id="<? echo trendCode($mcSunCode) ?>" data-rid="<? echo astro(trendCode($mcSunCode))['id'] ?>" data-trans-num="<? echo countTrans(astro(trendCode($mcSunCode))['id']) ?>">
			<h3><b><? echo $lang['mc_before'].' '.$lang[$mc].$lang['mc_after'].' '.$lang['and'].' '.$lang['sun'].' '.$lang[$sunSign] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro(trendCode($mcSunCode.'-sun-'.$sunSign))['content'] ?></div>
		</div> -->
	</div>
</section>
<? } ?>
