<? if ($n) {
	$dIn = getRecord('data', "`id` = '{$n}' ");
	$iid = $dIn['id'];
	$pTitle = $dIn['title'];
} else $pTitle = 'Data library';
if ($v != 'window') include MAIN_PATH.'/header.php';

if ($n) {
	if ($iid) {
		$uIn = getUserInfo($dIn['uid'], 'friends');
$pLikesAr = $pDislikesAr = array();
if ($dIn['likes']) $pLikesAr = explode(',', $dIn['likes']);
$pLikes = count($pLikesAr);
if ($dIn['dislikes']) $pDislikesAr = explode(',', $dIn['dislikes']);
$pDislikes = count($pDislikesAr);
$pLikesWidth = round($pLikes/($pLikes + $pDislikes), 4)*100;
$pDislikesWidth = round($pDislikes/($pLikes + $pDislikes), 4)*100;
$vote = $pLikes - $pDislikes;
$pFavAr = $sFavAr = explode(',', $dIn['fav']);
if ($dIn['fav']) $pFav = count($pFavAr);
else $pFav = 0;
$sFav = $pFav;
		if ($do) include 'system/'.$page.'/'.$do.'.php';
		else if ($type) include 'views/'.$page.'/v.'.$type.'.php';
		else include 'views/'.$page.'/view.php';
	} else include 'views/'.$page.'/list.php';
} else include 'views/'.$page.'/list.php';
