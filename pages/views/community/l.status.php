<div class="post-note">
	<a href="<? echo $sAu['link'] ?>"><? echo $sAu['name'] ?></a> updated a <a>status</a>
	<span class="right post-timemini"><? echo timeFormat($sIn['time']) ?></span>
</div>
<div class="post-icons">
	<div class="post-time updated" title="<? echo date('d.m.Y H:i', $sIn['time']) ?>">
		<span class="day"><? echo date('d', $sIn['time']) ?></span>
		<span class="month"><? echo date('M', $sIn['time']) ?></span>
	</div>
	<span class="icon-format"></span>
	<div class="clearfix"></div>
	<div class="post-author left">
		<a data-online="<? echo $sAu['online'] ?>" href="<? echo $sAu['link'] ?>"><img src="<? echo $sAu['avatar'] ?>" title="<? echo $sAu['name'] ?>" class="thumb img-rounded post-author-avt"/></a>
	</div>
</div>
<div class="post-info">
	<div class="post-stt">
		<? echo $sIn['content'] ?>
	</div>
</div>
<? $rList = $getRecord -> GET('status_cmts', "`iid` = '{$sid}' AND `show` = 1 ", '', 'LENGTH(likes) DESC, `time` DESC', 3);
$staType = 'cmt';
include 'l.fullSta.php' ?>
