<? //	$sunSign = $sign_name[floor($longitude1[0] / 30) + 1];
//	$moonSign = $sign_name[floor($longitude1[1] / 30) + 1];
	$pTitle = trendCode('moon-in-'.$moonSign); ?>
<section id="moon" class="hide">
	<div class="chart-report-head htitle"><? echo $lang['Moon sign'] ?></div>
	<div class="chart-report-content">
		<div class="chart-report-des"><? echo astro('moon')['content'] ?></div>
	<div class="module parallax">
		<div class="parallax-bg" style="background-image:url(<? echo zBg.'/zodiac-art-'.trendCode($moonSign).'.jpg' ?>)"></div>
		<div class="paragraph" id="<? echo $pTitle ?>" data-rid="<? echo astro($pTitle)['id'] ?>" data-trans-num="<? echo countTrans(astro($pTitle)['id']) ?>">
			<h3><b><? echo $lang[$pl_name[1]].' '.$lang['as^in'].' '.$lang[$moonSign] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro($pTitle)['content'] ?></div>
		</div>
	</div>
		<div class="paragraph" id="<? echo trendCode('moon-'.$moonSign.'-sun-'.$sunSign) ?>" data-rid="<? echo astro(trendCode('moon-'.$moonSign.'-sun-'.$sunSign))['id'] ?>" data-trans-num="<? echo countTrans(astro(trendCode($sunSign.'-'.$moonSign))['id']) ?>">
			<h3><b><? echo $lang['sun'].' '.$lang[$sunSign].' '.$lang['and'].' '.$lang['moon'].' '.$lang[$moonSign] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro(trendCode('moon-'.$moonSign.'-sun-'.$sunSign))['content'] ?></div>
		</div>
	</div>
</section>
