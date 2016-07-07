<? function countType ($type) {
	$vl = 0;
	$vlAr = $_POST[$type];
	$vlTotal = count($vlAr);
	foreach ($vlAr as $vlO) $vl += $vlO;
	$v = substr($type, 0, 1);
	$l = substr($type, 1, 1);
	$Ar = array();
	if ($vl > $vlTotal/2) $r = $v;
	else $r = $l;
	$vPer = round($vl/$vlTotal * 100);
	$lPer = 100 - $vPer;
	$Ar = array('r' => $r, $v => $vPer, $l => $lPer, 'res' => $vPer.'-'.$lPer);
	return $Ar;
}
if ($do == 'done') {
	$gender = $_POST['gender'];
	$result = $res = ''; $resultAr = array();
	foreach ($ar as $ao) {
		$re = countType($ao)['r'];
		$result .= $re;
		$res .= countType($ao)['res'].'|';
//		$resultAr[$ao] = countType($ao);
	}
	$full = 0;
	if ($n == 'advanced') $full = 1;
	$nn = countRecord('mbti', "`uid` = '{$u}' ") + 1;
	$check = getRecord('mbti', "`type` = '{$n}' AND `uid` = '{$u}' AND `uname` = '{$member['username']}' AND `mbti` = '{$result}' AND `mbti_data` = '{$res}' ");
	if ($check['id']) echo $pLink.'/u/'.$check['uname'].'/'.$check['n'];
	else {
		$ins = insert('mbti', "`type`, `uid`, `uname`, `n`, `full`, `gender`, `mbti`, `mbti_data`, `time`", " '{$n}', '{$u}', '{$member['username']}', '{$nn}', '{$full}', '{$gender}', '{$result}', '{$res}', '{$current}' ");
		if ($ins) {
			$check = getRecord('mbti', "`type` = '{$n}' AND `uid` = '{$u}' AND `uname` = '{$member['username']}' AND `mbti` = '{$result}' AND `mbti_data` = '{$res}' ");
			echo $pLink.'/u/'.$check['uname'].'/'.$check['n'];
		}
	}
} ?>
