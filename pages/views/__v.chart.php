<? include $page.'/__initialize.php';
if (!$_SESSION['show']) $_SESSION['show'] = 'top';
$show = $_SESSION['show'];
$sSelectedID = $_SESSION['source'];
$sSelected = getRecord('source', "`id` = '{$sSelectedID}' ") ?>
<style>body{overflow:hidden}
/*.left-sidebar{*width:100px;z-index:9}
.content{margin-left:100px;z-index:10;box-shadow:0 2px 1px #aaa}
.chart-v{left:100px}*/
</style>
<div class="chart-v chart-v-<? echo $tb ?>">
	<div class="chart-canvas-div col-lg-5">
		<? include $page.'/v.'.$tb.'.php' ?>
	</div>
	<div class="chart-report col-lg-7 no-padding">
		<div class="chart-nav"></div>
	<? foreach ($sections as $sec) include $page.'/s.'.$sec.'.php' ?>
		<section id="ratings" class="hide">
			<div class="chart-report-head htitle"><? echo $lang['Ratings'] ?></div>
			<div class="chart-report-content ratings">
				<? $tbRatings = $tb.'_ratings';
				include 'pages/views/ratings.php' ?>
				<? $iIn = $cIn; include 'pages/views/ratingsAdd.php' ?>
			</div>
		</section>
		<div class="chart-report-bottom">
			<div class="col-lg-6 right">
				<select class="form-control" data-v="<? echo $show ?>">
					<option class="all" disabled><? echo $lang['Show all reports'] ?></option>
					<option class="top"<? if (!$show || $show == 'top') echo ' selected' ?>><? echo $lang['Show top report only'] ?></option>
					<option class="source"<? if ($show == 'source') echo ' selected' ?>><? echo $lang['Show reports by source'] ?></option>
				</select>
			</div>
			<div class="col-lg-2 right no-padding-right">
			<? if ($show == 'source') { ?>
				<a class="source-selected" title="Source selected: <? echo $sSelected['title'] ?>"><img src="<? echo $sSelected['avatar'] ?>"/></a>
			<? } ?>
			</div>
		</div>
	</div>
</div> <!-- .chart-v -->
<script>var u = <? echo $u ?>;
var au = <? echo $cIn['uid'] ?>;
var sources = lng = translators = others = '';
<? foreach ($lgAr as $lK => $lO) {
	if ($lK == $lg) echo "lng += '<option disabled value=\"{$lK}\">{$lO}</option>';";
	else echo "lng += '<option value=\"{$lK}\">{$lO}</option>';";
}
$sList = $getRecord -> GET('source^id,title', "`lang` = '{$lg}' ");
foreach ($sList as $sO) echo "sources += '<option value=\"s{$sO['id']}\">{$sO['title']}</option>';";
echo "me = '<option selected value=\"u{$member['id']}\">@{$member['username']} - Me</option>';";
$tList = $getRecord -> GET('members^id,username', "`type` = 'translator' AND `id` != '{$u}' ");
foreach ($tList as $tO) echo "translators += '<option value=\"u{$tO['id']}\">@{$tO['username']}</option>';";
$tList = $getRecord -> GET('members^id,username', "`type` != 'translator' AND `id` != '{$u}' ");
foreach ($tList as $tO) echo "others += '<option value=\"u{$tO['id']}\">@{$tO['username']}</option>';"; ?>
</script>
<? $externalJs[] = JS.'/ratings.min.js';
//$externalJs[] = JS.'/jquery.appear.js';
$externalJs[] = JS.'/toc.min.js';
$externalJs[] = JS.'/chart/v.chart.js'; ?>
