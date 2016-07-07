<? 	$bCat = getRecord('blog_categories^link,title', "`id` = '{$sIn['cid']}' ");
$sCmts = countRecord('blog_cmts', "`iid` = '{$sid}' ") ?>

<div class="post-note">
	<a href="<? echo $sAu['link'] ?>"><? echo $sAu['name'] ?></a> added a <a href="<? echo $bLink.'/'.$sIn['link'].'.html' ?>">blog post</a> in <a href="<? echo $bLink.'/'.$bCat['link'] ?>"><? echo $bCat['title'] ?></a>
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
	<div class="post-sta">
		<div class="post-views">
			<span class="fa fa-eye"></span> <span class="post-sta-num"><? echo $sIn['views'] ?></span>
		</div>
		<div class="post-comments">
			<span class="fa fa-comments-o"></span> <span class="post-sta-num"><? echo $sCmts ?></span>
		</div>
	</div>
</div>
<div class="post-info">
	<div class="post-thumbs">
		<div class="post-thumb-img"><div class="post-thumb-img-inner">
			<div class="post-thumb-btns">
				<div class="post-thumb-view-photo" data-href="<? echo $bLink.'/'.$sIn['link'].'.html' ?>"><span class="fa fa-search"></span></div>
				<div class="post-thumb-link" data-href="<? echo $bLink.'/'.$sIn['link'].'.html' ?>"><span class="fa fa-link"></span></div>
			</div>
			<img class="post-thumb" src="<? echo $sIn['thumb'] ?>"/>
		</div></div>
	</div>
	<div class="post-details">
		<div class="post-title"><a href="<? echo $bLink.'/'.$sIn['link'].'.html' ?>"><? echo $sIn['title'] ?></a></div>
		<div class="post-des">
			<div class="post-des-shorten"><? echo nl2br($sIn['content']) ?></div>
		</div>
		<div class="post-more-btn"><span>Read more</span></div>
	</div>
</div>
<? $rList = $getRecord -> GET('blog_cmts', "`iid` = '{$sid}' ", '', '');
$sCmtLoad = 1; $getFav = 1; $staType = 'cmt';
include 'l.fullSta.php' ?>
