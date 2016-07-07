<? if ($n) {
	$nAr = explode('.', $n); $n = $nAr[0];
	$nPage = $pageAr[2];
	if ($nAr[1]) {
		$bIn = getRecord('blog', "`id` = '{$n}' OR `link` = '{$n}' ");
		$iid = $bIn['id'];
		if ($iid) {
			$pTitle = $bIn['title'];
			if ($nPage) {
				$bPi = getRecord('blog', "`link` = '{$nPage}' AND `bid` = '{$iid}' ");
				if ($bPi) $pTitle .= ' - '.$bPi['title'];
				else $pTitle = 'Error';
			}
		} else $pTitle = 'Error';
	} else $pTitle = 'Blogs';
} else $pTitle = 'Blogs';

if (!$do && !$v) include MAIN_PATH.'/header.php';

if ($n) {
	if ($iid) {
$pLikesAr = explode(',', $bIn['likes']);
if ($bIn['likes']) $pLikes = count($pLikesAr);
else $pLikes = 0;
$pDislikesAr = explode(',', $bIn['dislikes']);
if ($bIn['dislikes']) $pDislikes = count($pDislikesAr);
else $pDislikes = 0;
$pLikesWidth = round($pLikes/($pLikes + $pDislikes), 4)*100;
$pDislikesWidth = round($pDislikes/($pLikes + $pDislikes), 4)*100;
$pFavAr = $sFavAr = explode(',', $bIn['fav']);
if ($bIn['fav']) $pFav = count($pFavAr);
else $pFav = 0;
$sFav = $pFav;
$pItems = explode(',', $bIn['items']);
$items = count($pItems);
$uIn = getUserInfo($bIn['uid'], 'friends');
		$bCmt = $getRecord -> GET('blog_cmts', "`iid` = '{$iid}' ", '', '');
		$bCmtCount = count($bCmt);
		if ($do) include 'system/'.$page.'/view.php';
		else if ($v) include 'views/'.$page.'/v.'.$v.'.php';
		else {
			if (!$nPage || $bPi) include 'views/'.$page.'/view.php';
			else include 'error.php';
		}
	} else include 'views/'.$page.'/list.php';
} else include 'views/'.$page.'/list.php';
