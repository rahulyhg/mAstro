<? if ($n) {
	$sIn = getRecord('source', "`link` = '{$n}' ");
	$iid = $sIn['id'];
	$sAu = getUserInfo($sIn['uid']);
	$pTitle = $sIn['title'];
}
if (!$do && !$v) include MAIN_PATH.'/header.php';
if ($n) {
	if ($iid) {
		if ($do) include 'system/'.$page.'/view.php';
		else include 'views/'.$page.'/view.php';
	} else include 'error.php';
} else {
	if ($do) include 'system/'.$page.'/list.php';
	else include 'views/'.$page.'/list.php';
} ?>
