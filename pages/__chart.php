<? if (!$do && !$v) include MAIN_PATH.'/header.php';
if ($n) {
	if ($nn) {
		if ($iid) {
			$stt = $cIn['stt'];
			$display = false;
			$cOwn = getUserInfo($cIn['uid'], 'friends');
			$cAu = getUserInfo($cIn['ucreate'], 'friends');
			$cAu = $cOwn;
			$auFriendsAr = explode(',', $cAu['friends']);
			if ($stt == -1) $display = true;
			if ($stt == 0 && $cIn['uid'] == $u) $display = true;
			if ($stt == 1 && in_array($u, $auFriendsAr)) $display = true;
			if ($stt == 2) {
				$frF = array();
				foreach ($auFriendsAr as $aFo) {
					$aFi = getRecord('members^friends', "`id` = '{$cIn['uid']}' ");
					$aFf = explode(',', $aFi['friends']);
					foreach ($aFf as $aFfo) $frF[] = $aFfo;
				}
				if (in_array($u, $frF)) $display = true;
			}
			if ($cIn['uid'] == $u) $display = true;
			if ($cIn['uname'] == $username) $display = true;
			if ($display == false && $tb == 'relationship') {
				$aIDList = explode('::', $cIn['aid']);
				foreach ($aIDList as $aIDOne) {
					$aIDIn = getRecord('astro_data^uid', "`id` = '{$aIDOne}' ");
					if ($aIDIn['uid'] == $u) $display = true;
				}
			}
			if ($display == true) {
				if ($do) include 'system/v.view.php';
				else if ($v == 'pdf') include 'views/'.$tb.'/pdf.'.$tb.'.php';
				else if ($v == 'cosmodynes') include 'views/'.$tb.'/natal_cosmodynes.php';
				else {
					$totalRates = $averageRate = 0;
					$rates = $getRecord -> GET($tb.'_ratings', "`iid` = '{$iid}' ", '', '');
					$numRates = count($rates);
					foreach ($rates as $rates) {
						$averageRate = $averageRate + $rates['rate'];
						$totalRates = $totalRates + $rates['rate']*100/5;
					}
					$percentRate = number_format((100*($averageRate/$numRates)/5), 2);
					$averageRate = $cGrade = number_format(($averageRate/$numRates), 1);
					$totalRate = countRecord($tb.'_ratings', "`iid` = '{$iid}' ");
					if (($averageRate - floor($averageRate)) > 0.5) $averageRate = floor($averageRate) + 0.5;
					else $averageRate = floor($averageRate);
					addView($tb, $cIn);
					include 'views/__v.chart.php';
				}
			} else echo '<div class="alerts alert-warning">This chart has been generated but you have no permissions to view it.</div>';
		} else include 'error.php';
	} else include 'views/'.$page.'/l.'.$tb.'.php';
} else {
	if ($do) include 'system/'.$page.'/caculate.php';
	else include 'views/'.$page.'/view.php';
}
