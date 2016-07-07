<? if ($n) {
	$nAr = explode('.', $n); $n = $nAr[0];
	if ($nAr[1]) {
	} else {
	}
} else $pTitle = 'mAstro community';

if (!$v) include MAIN_PATH.'/header.php';

if ($v == 'up') include 'views/'.$page.'/u.'.$type.'.php';
else if ($n) {
	if ($iid) {
	} else include 'views/'.$page.'/list.php';
} else include 'views/'.$page.'/list.php';
