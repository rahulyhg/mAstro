<? $mode = get('mode');
$m = get('m');
if (!$do && !$v) include MAIN_PATH.'/header.php';
if ($u) {
	$tabs = array(
			'mastro_data' => 'mAstro data',
			'password' => 'Reset password',
			'settings' => 'Account settings',
			'noti' => 'Notifications settings',
			'mastro_setting' => 'mAstro settings',
			'info' => '<a href="'.$member['link'].'">Information</a>'
		);
	if ($do) foreach ($tabs as $tak => $tab) include 'system/'.$page.'/v.'.$tak.'.php';
	else { ?>
		<div class="alerts alert-info">
			We highly remcommend you save your data and even publish them to your friends.<br/>
			Saving your data can help you save time while generating a chart, and publishing them will allow people to generate <span class="italic">relationship charts</span> with your data. (without knowing your data details. They are always protected under our <a>privacy policy</a> in any circumstances.) <a>Read more</a>
		</div>
		<div id="m_tab" class="profile">
			<div class="m_tab">
		<? foreach ($tabs as $tak => $tab) {
			if (($mode && $mode == $tak) || $tak == 'mastro_data') echo '<div class="tab active" id="'.$tak.'">'.$tab.'</div>';
			else echo '<div class="tab" id="'.$tak.'">'.$tab.'</div>';
		} ?>
			</div>
		<? 	foreach ($tabs as $tak => $tab) {
				if (($mode && $mode == $tak) || $tak == 'mastro_data') echo '<div class="tab-index '.$tak.'">';
				else echo '<div class="hide tab-index '.$tak.'">';
					include 'views/'.$page.'/v.'.$tak.'.php';
				echo '</div>';
			} ?>
		</div>
<? 	}
} else include 'login.php'; ?>
