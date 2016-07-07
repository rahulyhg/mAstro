<div class="col-lg-9">
<? $cat = getRecord('blog_categories^id,title', "`link` = '{$n}' ");
$childCat = $getRecord -> GET('blog_categories^id,title', "`cid` = '{$cat['id']}' ");
$cCat = array();
foreach ($childCat as $cC) $cCat[] = $cC['id'];
$cCat = implode(',', $cCat);
$cid = $cat['id'];
if ($cid) {
	$cond = "`cid` = '{$cid}' ";
	if ($cCat) $cond .= "OR `cid` in ('{$cCat}') ";
	$cond .= 'AND ';
}
if ($cid) echo '<h3 class="blog-cat-title bor">'.$cat['title'].'</h3>';
$bList = $getRecord -> GET('blog', $cond.' `bid` = 0', '10');
if (count($bList) <= 0) echo '<div class="italic">Nothing found.</div>';
else {
foreach ($bList as $bO) {
	$sIn = $bO;
	$sid = $sIn['id'];
	$bCat = getRecord('blog_categories^link,title', "`id` = '{$bO['cid']}' ");
	$sCmts = countRecord('blog_cmts', "`iid` = '{$bO['id']}' ");
	$bAu = $sAu = getUserInfo($u);
	$sType = 'blog';
if ($sIn['likes']) {
	$sLikesAr = explode(',', $sIn['likes']);
	$sLikes = count($sLikesAr);
} else $sLikes = 0;
if ($sIn['dislikes']) {
	$sDislikesAr = explode(',', $sIn['dislikes']);
	$sDislikes = count($sDislikesAr);
} else $sDislikes = 0;
if ($sIn['fav']) {
	$sFavAr = explode(',', $sIn['fav']);
	$sFav = count($sFavAr);
} else $sFav = 0; ?>
	<div class="one-post type-blog">
		<? include 'pages/views/community/l.blog.php' ?>
	</div> <!-- .one-post -->
<? }
} ?>
</div>

<div class="col-lg-3 categories">
	<div class="cat_label bor">Categories</div>
	<ul class="cat_list">
<? $cList = $getRecord -> GET('blog_categories', "`cid` = 0");
foreach ($cList as $cO) {
	echo '<li><a href="'.$bLink.'/'.$cO['link'].'">'.$cO['title'].'</a>';
	$cChildList = $getRecord -> GET('blog_categories', "`cid` = '{$cO['id']}' ");
	if (count($cChildList) > 0) {
		echo '<ul class="cat_childlist">';
		foreach ($cChildList as $cCO) echo '<li><a href="'.$bLink.'/'.$cCO['link'].'">'.$cCO['title'].'</a></li>';
		echo '</ul>';
	}
	echo '</li>';
} ?>
	</ul>
</div>

<div class="clearfix"></div>
<style>#main-container{padding:30px 25px}</style>
<? $externalJs[] = JS.'/blog/list.js'; ?>
