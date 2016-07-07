<? if ($n) {
	$uIn = getRecord('members', "`id` = '{$n}' OR `username` = '{$n}' ");
	$uID = $uIn['id'];
	$uIn['name'] = $uIn['first_name'].' '.$uIn['last_name'];
	$pTitle = 'Edit your profile';
}
if (!$do && !$v) include MAIN_PATH.'/header.php';
if ($n) {
	if ($uID) {
		if ($do) include 'system/'.$page.'/view.php';
		else include 'views/'.$page.'/view.php';
	} else include 'error.php';
} else include 'error.php'; ?>
