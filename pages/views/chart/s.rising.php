<? if ($ubt1 == 0) {
//	$s_pos = floor($hc1[1] / 30) + 1;
//	$rising = $sign_name[$s_pos];
	$risingCode = 'rising-'.trendCode($rising);
	$risingSunCode = $risingCode.'-sun-'.trendCode($sunSign) ?>
<section id="ascendant" class="hide">
	<div class="chart-report-head htitle"><? echo $lang['The rising sign or ascendant'] ?></div>
	<div class="chart-report-content">
		<div class="chart-report-des"><? echo astro('rising')['content'] ?></div>
	<div class="module parallax">
		<div class="parallax-bg" style="background-image:url(<? echo zBg.'/zodiac-art-'.trendCode($rising).'.jpg' ?>)"></div>
		<div class="paragraph" id="<? echo ($risingCode) ?>" data-rid="<? echo astro($risingCode)['id'] ?>" data-trans-num="<? echo countTrans(astro($risingCode)['id']) ?>">
<!--			<img class="paragraph-bg" src="<? echo zBg.'/zodiac-art-'.trendCode($rising).'.jpg' ?>"/> -->
			<h3><b><? echo $lang['ascendant-before'] ?> <? echo $lang[$rising] ?> <? echo $lang['ascendant'] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro($risingCode)['content'] ?></div>
		</div>
	</div>
		<div class="paragraph" id="<? echo ($risingSunCode) ?>" data-rid="<? echo astro($risingSunCode)['id'] ?>" data-trans-num="<? echo countTrans(astro($risingSunCode)['id']) ?>">
			<h3><b><? echo $lang['rising_before'].' '.$lang[$rising].$lang['rising_after'].' '.$lang['and'].' '.$lang['sun'].' '.$lang[$sunSign] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro($risingSunCode)['content'] ?></div>
		</div>
	</div>
</section>
<? } ?>
