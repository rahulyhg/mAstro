<? if ($n) {
	$nn = $pageAr[2];
	$cIn = getRecord('transit', "`uname` = '{$n}' AND `n` = '{$nn}' ");
	$iid = $cIn['id'];
	$cAu = getUserInfo($cIn['uid']);
	if ($iid) $pTitle = $cAu['name'].'\'s transit';
	else $pTitle = 'Error';
}
$tb = 'transit';
include '__chart.php'; ?>
