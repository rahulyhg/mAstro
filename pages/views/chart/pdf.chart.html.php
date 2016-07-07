<? include '__initialize.php';
include '__initialize.dominant.php';
$pTitle = 'Sun In '.$sunSign;
$bd = (int)$month.$day;
$getSegment = $getRecord -> GET('zodiac', "`sign` = '{$sigi}' AND `vertex` = 0");
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
	<page_header backleft="20mm" backright="20mm">
		<table style="width: 100%" border="0" cellpadding="0" cellspacing="0" align="center">
			<tr>
				<td style="font-family: dejavusanscondensed; width: 50%; text-align: left; border-bottom: solid 1px #f5f5f5;padding:0 10px 15px">mAstro</td>
				<td style="font-family: dejavusanscondensed; width: 50%; text-align: right; border-bottom: solid 1px #f5f5f5;padding:0 10px 15px"><? echo $cIn['name'] ?></td>
			</tr>
		</table>
	</page_header>
	<page_footer>
		<table style="width: 100%" border="0" cellpadding="0" cellspacing="0" align="center">
			<tr><td style="font-family: dejavusanscondensed; width: 100%; text-align: center; *border-top: solid 1px #f5f5f5; padding-top:20px">Page [[page_cu]]/[[page_nb]]</td></tr>
		</table>
	</page_footer>

	<!-- Rising -->
	<? echo _astro('rising')['content'] ?>
	<h3><b><? echo $lang['ascendant-before'] ?> <? echo $lang[$rising] ?> <? echo $lang['ascendant'] ?></b></h3><? echo _astro($risingCode)['content'] ?>
	<h3><b><? echo $lang['rising_before'].' '.$lang[$rising].$lang['rising_after'].' '.$lang['and'].' '.$lang['sun'].' '.$lang[$sunSign] ?></b></h3><? echo _astro($risingSunCode)['content'] ?>
	<!-- Sun -->
	<h3><b><? echo $lang['Sun'].' '.$lang['as^in'].' '.$lang[$sigi] ?></b></h3><? echo _astro(trendCode($pTitle))['content'] ?>
	<h3><b><? echo $lang[$sunSign].' '.$lang['as^in'].' '.$lang['segment'].' '.$segment ?></b></h3><? echo _astro(trendCode('s'.$segment.'-'.$sigi))['content'] ?>
	<? if ($vertex != 0) { ?>
	<h3><b><? echo $lang[$sunSign].' '.$lang['as^in'].' '.$lang['v'.$vertex] ?></b></h3><? echo _astro(trendCode('v'.$vertex.'-'.$sigi))['content'] ?>
	<? } ?>
	<h3><b><? echo $lang[$sunSign].' '.$lang['as^in'].' '.$day.' '.$lang[date('F', $cIn['birthday'])] ?></b></h3><? echo _astro($day.$month)['content'] ?>

<style>.center{text-align:center}
.italic{font-style:italic}
.chart-report-des{font-style:italic;color:#777;font-size:13px;line-height:23px}</style>
