<? if ($n) {
	$nn = $pageAr[2];
	$cIn = getRecord('relationship', "`uname` = '{$n}' AND `n` = '{$nn}' ");
	$iid = $cIn['id'];
	$cAu = getUserInfo($cIn['uid']);
	if ($iid) $pTitle = $cAu['name'].'\'s chart | '.explode('::', $cIn['name'])[0].' - '.explode('::', $cIn['name'])[1];
	else $pTitle = 'Error';
}
$tb = 'relationship';
include '__chart.php'; ?>
