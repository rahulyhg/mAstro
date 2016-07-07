<? if ($do == 'caculate') {
	include 'pages/system/caculate.php';
	if ($ok == true) {
		$valAr = 
			array(
				'aid' => $aID,
				'name' => $name,
				'gender' => $gender,
				'birthday' => $bday,
				'birthhour' => $bhour,
				'timezone' => $timezone,
				'country' => $country,
				'town' => $town,
				'long_deg' => $long_deg,
				'lat_deg' => $lat_deg,
				'long_min' => $long_min,
				'lat_min' => $lat_min,
				'ew' => $ew_txt,
				'ns' => $ns_txt,
				'start' => $startt
			);
		createChart($tb, $valAr);
	}
} ?>
