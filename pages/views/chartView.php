<? $dListMe = $getRecord -> GET('astro_data^id,name,uname', "`uid` = '{$u}' ", '', '`name` ASC');
if (count($dListMe) <= 0) echo '<div class="alerts alert-warning">You have no mAstro data in database.<br/>We highly recommend you save at least one data. <a>Read more</a></div>';
if ($tb != 'relationship') $charts = $getRecord -> GET($tb, "`uid` != '{$u}' AND `aid` != 0 GROUP BY `aid` ");
else $charts = $getRecord -> GET('astro_data^id,name,uname,uid,stt', "`uid` != '{$u}' ", '', '`name` ASC');
foreach ($charts as $ck => $co) {
	$stt = $co['stt'];
	$display = false;
	$cAu = getUserInfo($co['uid'], 'friends');
	$auFriendsAr = explode(',', $cAu['friends']);
	if ($stt == -1) $display = true;
	if ($stt == 0 && $co['uid'] == $u) $display = true;
	if ($stt == 1 && in_array($u, $auFriendsAr)) $display = true;
	if ($stt == 2) {
		$frF = array();
		foreach ($auFriendsAr as $aFo) {
			$aFi = getRecord('members^friends', "`id` = '{$co['uid']}' ");
			$aFf = explode(',', $aFi['friends']);
			foreach ($aFf as $aFfo) $frF[] = $aFfo;
		}
		if (in_array($u, $frF)) $display = true;
	}
	if ($co['uid'] == $u) $display = true;
	if ($display == false) unset($charts[$ck]);
}
$charts = array_values($charts);
$first = true;
if (in_array(JS.'/chart/view.js', $externalJs)) $first = false ?>
<!--<div class="alerts alert-warning">
	When you create a chart with another's data, if the chart is generated, you will be directed to existed link (not new page).
</div> -->
	<div class="form-group apply-data">
		<div class="col-lg-5 no-padding control-label"><? echo $lang['Apply an available mAstro data'] ?></div>
		<div class="col-lg-7 no-padding-right">
			<select class="chosen-select form-control" name="aid<? echo $p ?>" id="apply_data">
				<optgroup label="My mAstro data">
		<? 	foreach ($dListMe as $dK => $dO) {
				if ($dK == 0) $seclected = ' selected';
				else $seclected = '';
				echo '<option'.$seclected.' value="'.$dO['id'].'">'.$dO['name'].' - @'.$dO['uname'].'</option>';
			} ?>
				</optgroup>
		<? /*	$list = $member['friends'];
			if ($list) {
				echo '<optgroup label="Other available mAstro data">';
				$dList = $getRecord -> GET('astro_data^id,name,uname', "`uid` in ({$list})", '', '`name` ASC');
				foreach ($dList as $dK => $dO) {
					echo $dK;
					if ($dK == 0) $seclected = ' selected';
					else $seclected = '';
					echo '<option'.$seclected.' value="'.$dO['id'].'">'.$dO['name'].' - @'.$dO['uname'].'</option>';
				}
				echo '</optgroup>';
			} else $dList = array();*/ ?>
		<? if (count($charts) > 0 && ($tb != 'relationship' || $first == false)) {
				echo '<optgroup label="Other available mAstro data">';
				foreach ($charts as $dL => $ch) {
					if ($tb != 'relationship') $dO = getRecord('astro_data^id,name,uname', "`id` = '{$ch['aid']}' ");
					else $dO = $ch;
					$dList[] = $dO['id'];
					if ($dL == 0 && count($dListMe) <= 0) $seclected = ' selected';
					else $seclected = '';
					echo '<option'.$seclected.' value="'.$dO['id'].'">'.$dO['name'].' - @'.$dO['uname'].'</option>';
				}
				echo '</optgroup>';
			} else $dList = array();
			$total_dList = count($dListMe) + count($dList); ?>
			</select>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="txt-with-line">
		<span class="txt generate-new-button">Or generate new <span class="fa fa-caret-down"></span></span>
	</div>
	<div class="generate-data <? if ($total_dList > 0) echo 'hide' ?>">
		<? include 'form.php' ?>
		<? if ($page == 'transit') echo '<hr/>' ?>
	</div>
<? if ($first == true) $externalJs[] = JS.'/chart/view.js' ?>
