		<div class="popup-main">
			<div class="popup-section section-light blog-p-info padding">
				<div class="mix-v-title bold"><a href="<? echo $bLink.'/'.$bIn['link'] ?>.html"><? echo $bIn['title'] ?></a></div>
				<div class="clearfix"></div>
				<div class="blog-p-content">
					<? echo content($bIn['content']) ?>
				</div>
			</div>
		</div>
		<div class="popup-right">
			<div class="popup-section section-light mix-p-more">
				<div class="mix-v-fav">
					<div class="mix-fav-btn left fa fa-heart"></div>
					<div class="mix-fav-num left"><? echo $pFav ?></div>
				</div>
				<div class="mix-p-sta right">
					<div class="mix-v-views">
						<span class="fa fa-eye"></span>
						<span class="mix-views-num"><? echo $bIn['views'] ?></span>
					</div>
					<div class="mix-v-cmts">
						<span class="fa fa-comments-o"></span>
						<span class="mix-cmts-num"><? echo $bCmtCount ?></span>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="popup-section section-light mix-p-author">
				<div class="mix-p-creator">
					<img title="<? echo $uIn['name'] ?> created this collection" src="<? echo $uIn['avatar'] ?>" class="product-user-avatar left img-rounded"/>
					<div class="product-user-name">
						<a href="<? echo $uIn['link'] ?>"><? echo $uIn['name'] ?></a>
						<div class="button-follow">
							<div class="btn btn-follow btn-red">
								<span class="fa fa-eye"></span> Follow
							</div>
							<div class="num-follow">
								<? echo count(explode(',', $uIn['followers'])) ?>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="popup-section section-light blog-v-related margin-top">
				<h4 style="margin-top:0">Related threads</h4>
				<ol><? $sL = $getRecord -> GET('blog^title,link', "`bid` = 0", 5);
				foreach ($sL as $si) { ?>
					<li><a href="<? echo $bLink.'/'.$si['link'].'.html' ?>"><? echo $si['title'] ?></a></li>
				<? } ?>
				</ol>
			</div>
		</div>

		<div class="clearfix"></div>

		<div class="popup-full">
			<div class="popup-section section-light blog-cmts post-cmts margin-top">
<? $rList = $getRecord -> GET('blog_cmts', "`iid` = '{$iid}' AND `show` = 1 ", '', 'LENGTH(likes) DESC, LENGTH(content) DESC');
if (count($rList) == 0) echo 'No comments yet.';
else {
foreach ($rList as $rl) {
	$rAu = getUserInfo($rl['uid']) ?>
	<div class="one-rating one-reg hep<? echo $rl['id'] ?> <? if ($rl['content']) echo 'with-content' ?>" data-uid="<? echo $rl['uid'] ?>" alt="<? echo $rl['id'] ?>">
		<a class="left" data-online="<? echo $rAu['online'] ?>" href="<? echo $rAu['link'] ?>">
			<img class="rl-avt img-rounded left" width="40px" height="40px" src="<? echo $rAu['avatar'] ?>"/>
		</a>
		<div class="rl-details">
			<div class="gensmall right reg-time" style="margin-top:3px"><? echo timeFormat($rl['time']) ?></div>
			<a class="bold left" href="<? echo $rAu['link'] ?>"><? echo $rAu['name'] ?></a>
			<div class="rl-content left" style="margin-left:7px">
				<? if ($rl['content']) echo tag($rl['content']) ?>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
<? }
} ?>
			</div>
		</div>

		<div class="popup-full">
			<div class="popup-section section-light blog-add-cmt margin-top">
				<? include 'cmtForm.php' ?>
			</div>
		</div>

<script src="<? echo JS.'/blog/view.js' ?>"></script>
