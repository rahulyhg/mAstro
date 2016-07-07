<? $noti = $getRecord -> GET('notification', "`to_uid` = '{$u}' ");
foreach ($noti as $nO) {
	$nAu = getRecord("members", "`id` = '{$nO['uid']}'") ?>
<li class="<? if ($nO['read'] != 'read') echo 'unread' ?>"><div class="dropdown-noti">
<? if ($nO['type'] == 'create-relationship') {
	$imgnoti = silk.'/coins_add.png';
	$iIn = getRecord('relationship^n', "`id` = '{$nO['iid']}' ") ?>
	<a class="left" data-online="<? echo $nAu['online'] ?>">
		<img class="noti-avt img-circle" src="<? echo $nAu['avatar'] ?>"/>
	</a>
	<a class="bold" href="<? echo $nO['link'] ?>">
		<? echo $nAu['username'] ?>
	</a>
	created a relationship chart with your data.
	<a href="<? echo $rLink.'/'.$nAu['username'].'/'.$iIn['n'] ?>" class="bold">View</a>
<? } ?>
	<div class="clearfix"></div>
</li>
<? } ?>
