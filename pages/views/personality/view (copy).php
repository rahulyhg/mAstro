<? $dAr = explode('|', substr($mIn['mbti_data'], 0, -1)); ?>
<style>body{overflow:hidden}</style>
<div class="chart-v m-view">

<div class="m-info">
	<h2 class="m-uname"><? echo $mAu['name']."'s MBTI result" ?></h2>
	<div class="m-details">
	<? foreach ($dAr as $dk => $dO) {
		$ty = $ar[$dk];
//		$tyAr = array(substr($ty, 0, 1), substr($ty, 1, 1));
		echo '<li>';
		$tAr = explode('-', $dO);
		foreach ($tAr as $tk => $tO) {
			$tin = getRecord('data^title', "`code` = 'mbti-{$ty[$tk]}' ");
			echo '<div class="col-lg-6">';
			if ($tO > 50) echo '<b class="red">';
			echo $tin['title'];
			if ($tO > 50) echo '</b>';
			echo '</div>';
		}
		echo '</li>';
	}
	echo '<div class="m-summary">=> Your personality type is: <b>'.strtoupper($mIn['mbti']).'</b></div>' ?>
	</div>
</div>

<div class="chart-report m-report">
	<div class="chart-nav m-nav"></div>
<? $sections = array('overview');
foreach ($sections as $sec) include 's.'.$sec.'.php' ?>

	<section id="ratings" class="hide">
		<div class="chart-report-head htitle"><? echo $lang['Ratings'] ?></div>
		<div class="chart-report-content ratings">
			<? $tbRatings = 'transit_ratings';
			include 'pages/views/ratings.php' ?>
			<? $iIn = $mIn; include 'pages/views/ratingsAdd.php' ?>
		</div>
	</section>

	<div class="chart-report-bottom">
		<div class="col-lg-6 right">
			<select class="form-control">
				<option class="all"><? echo $lang['Show all reports'] ?></option>
				<option class="top"><? echo $lang['Show top report only'] ?></option>
			</select>
		</div>
	</div>
</div>

</div>
<script>var u = <? echo $u ?>;
var au = <? echo $cIn['uid'] ?>;
var sources = translators = others = '';
<? $sList = $getRecord -> GET('source^id,title', "`lang` = '{$lg}' ");
foreach ($sList as $sO) echo "sources += '<option value=\"s{$sO['id']}\">{$sO['title']}</option>';";
echo "me = '<option value=\"u{$member['id']}\">@{$member['username']} - Me</option>';";
$tList = $getRecord -> GET('members^id,username', "`type` = 'translator' AND `id` != '{$u}' ");
foreach ($tList as $tO) echo "translators += '<option value=\"u{$tO['id']}\">@{$tO['username']}</option>';";
$tList = $getRecord -> GET('members^id,username', "`type` != 'translator' AND `id` != '{$u}' ");
foreach ($tList as $tO) echo "others += '<option value=\"u{$tO['id']}\">@{$tO['username']}</option>';"; ?>
</script>
<? $externalJs[] = JS.'/ratings.min.js';
$externalJs[] = JS.'/v.chart.js' ?>
