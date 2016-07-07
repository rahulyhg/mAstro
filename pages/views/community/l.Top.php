<? 	$sAu = getUserInfo($sO['uid']);
	$sType = $sO['type'];
	$sTb = explode('-', $sType)[0];
	$sid = $sO['iid'];
	$sIn = getRecord($sTb, "`id` = '{$sid}' ");
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
