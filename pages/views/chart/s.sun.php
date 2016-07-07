<? $sigi = $sunSign;
$pTitle = 'Sun In '.$sunSign;
$bd = (int)$month.$day;
$getSegment = $getRecord -> GET('zodiac', "`sign` = '{$sunSign}' AND `vertex` = 0");
foreach ($getSegment as $sO) {
	$ss = (int)(substr($sO['start'], 2, 2).substr($sO['start'], 0, 2));
	$se = (int)(substr($sO['end'], 2, 2).substr($sO['end'], 0, 2));
	if ($bd >= $ss && $bd <= $se) {
		$segment = $sO['segment'];
		break;
	}
}
$ver = getRecord('zodiac', "`sign` = '{$sigi}' AND `segment` = '{$segment}' ");
$vs = (int)(substr($ver['start'], 2, 2).substr($ver['start'], 0, 2));
$ve = (int)(substr($ver['end'], 2, 2).substr($ver['end'], 0, 2));
$vertex = 0;
if ($bd >= $vs && $bd <= $ve) $vertex = $ver['vertex']; ?>
<section id="sun" class="hide">
	<div class="chart-report-head htitle"><? echo $lang['Overview your sun sign'] ?></div>
	<div class="chart-report-content">
		<div class="chart-report-des"><? echo astro('sun')['content'] ?></div>
	<div class="module parallax">
		<div class="parallax-bg" style="background-image:url(<? echo zBg.'/zodiac-art-'.trendCode($sunSign).'.jpg' ?>)"></div>
		<div class="paragraph" id="<? echo trendCode($pTitle) ?>" data-rid="<? echo astro(trendCode($pTitle))['id'] ?>" data-trans-num="<? echo countTrans(astro(trendCode($pTitle))['id']) ?>">
			<h3><b><? echo $lang['Sun'].' '.$lang['as^in'].' '.$lang[$sunSign] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro(trendCode($pTitle))['content'] ?></div>
		</div>
	</div>
		<div class="paragraph" id="<? echo trendCode('s'.$segment.'-'.$sigi) ?>" data-rid="<? echo astro(trendCode('s'.$segment.'-'.$sigi))['id'] ?>" data-trans-num="<? echo countTrans(astro(trendCode('s'.$segment.'-'.$sigi))['id']) ?>">
			<h3><b><? echo $lang[$sunSign].' '.$lang['as^in'].' '.$lang['segment'].' '.$segment ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro(trendCode('s'.$segment.'-'.$sigi))['content'] ?></div>
		</div>
	<? if ($vertex != 0) { ?>
		<div class="paragraph" id="<? echo trendCode('v'.$vertex.'-'.$sigi) ?>" data-rid="<? echo astro(trendCode('v'.$vertex.'-'.$sigi))['id'] ?>" data-trans-num="<? echo countTrans(astro(trendCode('v'.$vertex.'-'.$sigi))['id']) ?>">
			<h3><b><? echo $lang[$sunSign].' '.$lang['as^in'].' '.$lang['v'.$vertex] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro(trendCode('v'.$vertex.'-'.$sigi))['content'] ?></div>
		</div>
	<? } ?>
		<div class="paragraph" id="<? echo $day.$month ?>" data-rid="<? echo astro(trendCode($day.$month))['id'] ?>" data-trans-num="<? echo countTrans(astro($day.$month)['id']) ?>">
			<h3><b><? echo $lang[$sunSign].' '.$lang['as^in'].' '.$day.' '.$lang[date('F', $cIn['birthday'])] ?></b></h3>
			<div class="chart-paragraph-content"><? echo astro($day.$month)['content'] ?></div>
		</div>
	</div>
</section>
