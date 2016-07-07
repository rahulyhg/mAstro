<? $code = $dIn['code'];
$ot = get('ot');
$sort = get('sort');
$order = get('order');
if (!$sort || $sort == 'ratings') {
	if ($order == 'asc') $ordeR = "LENGTH(likes) DESC, LENGTH(dislikes) ASC";
	else $ordeR = "LENGTH(likes) ASC, LENGTH(dislikes) DESC";
} else {
	if ($order == 'asc') $ordeR = '`time` ASC';
	else $ordeR = '`time` DESC';
}
if (!$ot || $ot == 'o') $more = "`translate` = 0";
else $more = "`translate` = 1";
$related = $getRecord -> GET('data', "`code` = '{$code}' AND `lang` = '{$dIn['lang']}' AND {$more} ", '', $ordeR); ?>
<div class="popup-full">
	<div class="popup-section section-light">
		<div class="data-filter-options" data-rid="<? echo $dIn['id'] ?>">
			<div class="filter-lang left">
				Language: <img src="<? echo IMG ?>/flags/<? echo $dIn['lang'] ?>.png"/>
			</div>
			<div class="filter-sort right">
				Order by: 
				<select id="sort">
					<option value="ratings" <? if (!$sort || $sort == 'ratings') echo 'selected' ?>>Ratings</option>
					<option value="time" <? if ($sort == 'time') echo 'selected' ?>>Time</option>
				</select>
				<select id="order">
					<option value="asc" <? if ($order == 'asc') echo 'selected' ?>>ASC</option>
					<option value="desc" <? if (!$order || $order == 'desc') echo 'selected' ?>>DESC</option>
				</select>
			</div>
			<div class="filter-ot right">
				Type:
				<select id="ot">
					<option value="o" <? if (!$ot || $ot == 'o') echo 'selected' ?>>Origin</option>
					<option value="t" <? if ($ot == 't') echo 'selected' ?>>Translated</option>
				</select>
			</div>
			<div class="clearfix"></div>
		</div>
	<div class="data-list">
<? if (count($related) <= 0) echo '<div class="one-data">No data available.</div>';
else {
foreach ($related as $rO) {
	$pLikesAr = $pDislikesAr = array();
	if ($rO['likes']) $pLikesAr = explode(',', $rO['likes']);
	$pLikes = count($pLikesAr);
	if ($rO['dislikes']) $pDislikesAr = explode(',', $rO['dislikes']);
	$pDislikes = count($pDislikesAr);
	$vote = $pLikes - $pDislikes;
//	$pLikesWidth = round($pLikes/($pLikes + $pDislikes), 4)*100;
//	$pDislikesWidth = round($pDislikes/($pLikes + $pDislikes), 4)*100;
	$sIn = getRecord('source', "`id` = '{$rO['sid']}' ");
	if ($rO['translate'] == 1) {
		$pIn = getRecord('data', "`id` = '{$rO['did']}' ");
//		$auTrans = '<a href=""></a>';
	}
	$au = getUserInfo($dIn['uid']);
	if ($sIn['avatar']) {
		$thumb = $sIn['avatar'];
		$sTxt = '<a target="_blank" href="'.$sLink.'/'.$sIn['link'].'">'.$sIn['title'].'</a>';
	} else {
		$thumb = MAIN_URL.'/data/black.jpg';
		$sTxt = '<a>[Unnamed source]</a>';
	} ?>
	<div class="one-data<? if ($rO['id'] == $iid) echo ' active' ?>" data-id="<? echo $code ?>" data-rid="<? echo $rO['id'] ?>">
		<div class="col-lg-1 no-padding">
			<div class="sta-button">
				<div class="sta-likes-btn"><? echo $pLikes ?></div>
				<div class="sta-dislikes-btn"><? echo $pDislikes ?></div>
			</div>
			<img class="source-thumb" src="<? echo $thumb ?>"/>
		<? if ($vote != 0) { ?>
			<div class="vote-grade <? if ($vote > 0) echo 'text-primary'; else echo 'text-danger' ?>" align="center">
				<? if ($vote > 0) echo '+'; echo $vote ?>
			</div>
		<? } ?>
		</div>
		<div class="col-lg-11 no-padding-right">
			<div class="source-title"><? echo $sTxt ?> <span class="gensmall"><? if ($rO['translate'] == 1) echo 'translated from <a target="_blank" href="'.$dLink.'/'.$pIn['id'].'">#'.$pIn['id'].'</a>' ?></span></div>
			<div class="shorten"><? echo $rO['content'] ?></div>
		<? if ($sIn['uid']) { ?>
			<div class="contributor left">
				<a href="<? echo $au['link'] ?>" data-online="<? echo $au['online'] ?>">
					<img class="left" style="height:30px;margin-right:6px" src="<? echo $au['avatar'] ?>"/>
				</a>
				<a href="<? echo $au['link'] ?>"><? echo $au['name'] ?></a>
			</div>
		<? } ?>
			<div class="gensmall right time">Added <? echo timeFormat($rO['time']) ?></div>
		</div>
		<div class="clearfix"></div>
	</div>
<? }
} ?>
	</div> <!-- .data-list -->
	</div>
</div>
<script src="<? echo JS ?>/report/list.js"></script>
