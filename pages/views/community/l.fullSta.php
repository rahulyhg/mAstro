<div class="post-full-stas">
<? if ($staType != 'cmt') $staType = 'ratings';
if ($getFav == 1) { ?>
	<div class="post-fav">
		<span class="post-fav-btn"><span class="fa fa-heartbeat"></span> <span class="fa fa-heart hide"></span></span>
		<span class="post-sta-num"><? echo $sFav ?></span>
	</div>
	<? favList($sFavAr) ?>
<? } ?>
	<div class="post-cmts">
		<? if ($sCmt > 3 && $sCmtLoad == 1) {
			if ($staType == 'cmt') echo '<div class="load-more-cmt"><span class="fa fa-repeat"></span> Load more comments</div>';
			else echo '<div class="load-more-cmt"><span class="fa fa-repeat"></span> Load more ratings</div>';
		} ?>
<? foreach ($rList as $rk => $rl) {
	$rAu = getUserInfo($rl['uid']) ?>
		<div class="one-cmt">
			<a data-online="<? echo $rAu['online'] ?>" href="<? echo $rAu['link'] ?>"><img class="thumb img-rounded left" src="<? echo $rAu['avatar'] ?>"/></a>
			<div class="cmt-content">
				<a style="margin-top:-3px!important<? if ($staType != 'ratings') echo ';margin-right:10px' ?>" class="left" href="<? echo $rAu['link'] ?>"><b class="ont-cmt-name"><? echo $rAu['name'] ?></b></a>
		<? if ($staType == 'ratings') { ?>
				<div class="star-info left" style="margin:-3px 7px -1px">
				<? for ($z = 1; $z <= 5; $z++) { ?>
					<span class="fa fa-star<? if ($rl['rate'] < $z) echo '-o' ?>"></span>
				<? } ?>
				</div>
				<div style="margin-top:-3px!important"><span class="rl-title bold"><? echo $rl['title'] ?></span></div>
		<? } ?>
				<? echo content($rl['content']) ?>
				<div class="clearfix"></div>
			</div>
			<div class="clearfix"></div>
		</div>
<? } ?>
	</div>
</div>
