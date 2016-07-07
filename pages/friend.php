<? if (!$do && !$v) include MAIN_PATH.'/header.php'; ?>

<div class="friend-list">
	<div class="alerts alert-info">Updating friend list will allow you to see your friends' chart and use their data to generate the <a>Davision Relationship chart</a></div>
	<div class="alerts alert-warning">We're currently working on this section on mAstro, therefore, friends list will only be extracted from your Facebook account, which means you must <a>login with Facebook</a> to have this list updated.</div>
<? if ($memberFriends <= 0) echo '<div class="italic">This list is empty.</div>';
else {
	foreach ($memberFriendsAr as $mFo) {
		$mF = getUserInfo($mFo) ?>
	<div class="friend-one">
		<div class="friend-avt">
			<a data-online="<? echo $mF['online'] ?>" href="<? echo $mF['link'] ?>">
				<img class="friend-avt-img img-rounded" src="<? echo $mF['avatar'] ?>"/>
			</a>
		</div>
		<a class="friend-name left" href="<? echo $mF['link'] ?>">
			<? echo $mF['name'] ?>
		</a>
		<div class="clearfix"></div>
	</div>
<? 	}
} ?>
	<div class="clearfix"></div>
</div>
