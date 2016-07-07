<? // ei: e=1; i=0;
// tf: t=1; f=0;
// sn: s=1; n=0;
// jp: j=1; p=0;
$ar = array('ei', 'sn', 'tf', 'jp');

$fAr = array(
	'simple',
	'advanced'
);
$nAr = array('ISTJ', 'ISTP', 'ESTP', 'ESTJ', 'ISFP', 'ESFP', 'ESFJ', 'INFJ', 'INFP', 'ENFP', 'ENFJ', 'INTJ', 'ISFJ', 'INTP', 'ENTP', 'ENTJ');
if ($n == 'u') {
	$nu = $pageAr[2];
	$nn = $pageAr[3];
	$mIn = getRecord('mbti', "`uname` = '{$nu}' AND `n` = '{$nn}' ");
	$iid = $mIn['id'];
	if ($iid) {
		$mAu = getUserInfo($mIn['uid']);
		$pTitle = $mAu['name']."'s MBTI result: ".strtoupper($mIn['mbti']);
	} else $pTitle = 'Error';
} else if ($n) $pTitle = $n.' test';
else $pTitle = 'Personality tests';
if (!$do) include 'header.php';
if ($n == 'u') {
	if ($iid) include 'views/'.$page.'/v.'.$mIn['type'].'.php';
	else include 'error.php';
} else if ($n) {
	if ($do) include 'system/'.$page.'/'.strtolower($n).'.php';
	else include 'views/'.$page.'/f.'.strtolower($n).'.php';
} else include 'views/'.$page.'/list.php'; ?>
