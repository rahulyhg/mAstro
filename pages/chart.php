<? if ($n) {
	$nn = $pageAr[2];
	$cIn = getRecord('chart', "`uname` = '{$n}' AND `n` = '{$nn}' ");
	$iid = $cIn['id'];
	$cAu = getUserInfo($cIn['uid']);
	if ($iid) $pTitle = $cAu['name'].'\'s chart';
	else $pTitle = 'Error';
}
$tb = 'chart';
include '__chart.php'; ?>
