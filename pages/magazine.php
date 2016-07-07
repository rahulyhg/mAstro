<? if ($n) {
	$nAr = explode('.', $n); $n = $nAr[0];
	if ($nAr[1]) {
		$bIn = getRecord('blog', "`id` = '{$n}' OR `link` = '{$n}' ");
		$iid = $bIn['id'];
		$pTitle = $bIn['title'];
	}
} else $pTitle = 'Magazines';

if ($v != 'window') include MAIN_PATH.'/header.php';

if ($n == 'publish') {
	if ($do) include 'system/'.$page.'/publish.php';
	else include 'views/'.$page.'/publish.php';
} else if ($n) {
	if ($v == 'window') include 'views/'.$page.'/preview.php';
	else include 'views/'.$page.'/view.php';
} else include 'views/'.$page.'/list.php';
