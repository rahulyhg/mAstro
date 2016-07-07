<? $months = array (0 => 'Choose month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
$my_error = "";

if ($do == 'caculate') {
	$ok = false;
	$aID1 = $_POST['aid'];
	$aID2 = $_POST['aid2'];
	if ($aID1) {
		$_DATA = getRecord('astro_data', "`id` = '{$aID1}' ");
		$name1 = $_DATA['name'];
		$gender1 = $_DATA['gender'];
		$bday1 = $_DATA['birthday'];
		$day1 = date('d', $bday1);
		$month1 = (int)date('m', $bday1);
		$year1 = date('Y', $bday1);
		$hour1 = explode(':', $_DATA['birthhour'])[0];
		$minute1 = explode(':', $_DATA['birthhour'])[1];
/*		$long_deg1 = DECtoDMS(explode('|', $_DATA['long'])[1])['deg'];
		$long_min1 = DECtoDMS(explode('|', $_DATA['long'])[1])['min'];
		$lat_deg1 = DECtoDMS(explode('|', $_DATA['lat'])[1])['deg'];
		$lat_min1 = DECtoDMS(explode('|', $_DATA['lat'])[1])['min'];
		$ns_txt1 = explode('|', $_DATA['lat'])[0];
		$ew_txt1 = explode('|', $_DATA['long'])[0];
*/		$long_deg1 = $_DATA['long_deg'];
		$long_min1 = $_DATA['long_min'];
		$lat_deg1 = $_DATA['lat_deg'];
		$lat_min1 = $_DATA['lat_min'];
		$ns_txt1 = $_DATA['ns'];
		$ew_txt1 = $_DATA['ew'];
		if ($ew_txt1 == 'e') $ew1 = 1;
		else $ew1 = -1;
		if ($ns_txt1 == 'n') $ns1 = 1;
		else $ns1 = -1;
		$country1 = $_DATA['country'];
		$town1 = $_DATA['town'];
		$timezone1 = $_DATA['timezone'];
	} else {
		$h_sys = safeEscapeString($_POST["h_sys"]);
		$name1 = safeEscapeString($_POST["name"]);
		$gender1 = safeEscapeString($_POST["gender"]);

		$month1 = safeEscapeString($_POST["month"]);
		$day1 = safeEscapeString($_POST["day"]);
		$year1 = safeEscapeString($_POST["year"]);

		$hour1 = safeEscapeString($_POST["hour"]);
		$minute1 = safeEscapeString($_POST["min"]);

		$timezone1 = safeEscapeString($_POST["timezone"]);
		$country1 = safeEscapeString($_POST["country"]);
		$town1 = safeEscapeString($_POST["town"]);

		$long_deg1 = safeEscapeString($_POST["long_deg"]);
		$long_min1 = safeEscapeString($_POST["long_min"]);
		$ew1 = safeEscapeString($_POST["ew"]);

		$lat_deg1 = safeEscapeString($_POST["lat_deg"]);
		$lat_min1 = safeEscapeString($_POST["lat_min"]);
		$ns1 = safeEscapeString($_POST["ns"]);
	}
	if ($aID2) {
		$_DATA2 = getRecord('astro_data', "`id` = '{$aID2}' ");
		$name2 = $_DATA2['name'];
		$gender2 = $_DATA2['gender'];
		$bday2 = $_DATA2['birthday'];
		$day2 = date('d', $bday2);
		$month2 = (int)date('m', $bday2);
		$year2 = date('Y', $bday2);
		$hour2 = explode(':', $_DATA2['birthhour'])[0];
		$minute2 = explode(':', $_DATA2['birthhour'])[1];
/*		$long_deg2 = DECtoDMS(explode('|', $_DATA2['long'])[1])['deg'];
		$long_min2 = DECtoDMS(explode('|', $_DATA2['long'])[1])['min'];
		$lat_deg2 = DECtoDMS(explode('|', $_DATA2['lat'])[1])['deg'];
		$lat_min2 = DECtoDMS(explode('|', $_DATA2['lat'])[1])['min'];
		$ns_txt2 = explode('|', $_DATA2['lat'])[0];
		$ew_txt2 = explode('|', $_DATA2['long'])[0];
*/		$long_deg2 = $_DATA2['long_deg'];
		$long_min2 = $_DATA2['long_min'];
		$lat_deg2 = $_DATA2['lat_deg'];
		$lat_min2 = $_DATA2['lat_min'];
		$ns_txt2 = $_DATA2['ns'];
		$ew_txt2 = $_DATA2['ew'];
		if ($ew_txt2 == 'e') $ew2 = 1;
		else $ew2 = -1;
		if ($ns_txt2 == 'n') $ns2 = 1;
		else $ns2 = -1;
		$country2 = $_DATA2['country'];
		$town2 = $_DATA2['town'];
		$timezone2 = $_DATA2['timezone'];
	} else {
		$h_sys2 = safeEscapeString($_POST["h_sys2"]);
		$name2 = safeEscapeString($_POST["name2"]);
		$gender2 = safeEscapeString($_POST["gender2"]);

		$month2 = safeEscapeString($_POST["month2"]);
		$day2 = safeEscapeString($_POST["day2"]);
		$year2 = safeEscapeString($_POST["year2"]);

		$hour2 = safeEscapeString($_POST["hour2"]);
		$minute2 = safeEscapeString($_POST["min2"]);

		$timezone2 = safeEscapeString($_POST["timezone2"]);
		$country2 = safeEscapeString($_POST["country2"]);
		$town2 = safeEscapeString($_POST["town2"]);

		$long_deg2 = safeEscapeString($_POST["long_deg2"]);
		$long_min2 = safeEscapeString($_POST["long_min2"]);
		$ew2 = safeEscapeString($_POST["ew2"]);

		$lat_deg2 = safeEscapeString($_POST["lat_deg2"]);
		$lat_min2 = safeEscapeString($_POST["lat_min2"]);
		$ns2 = safeEscapeString($_POST["ns2"]);
	}

//	$bday1 = strtotime("$day1 ".date('F', mktime(0, 0, 0, $month1, 10))." $year1");
	$bhour1 = $hour1.':'.$minute1;

//	$bday2 = strtotime("$day2 ".date('F', mktime(0, 0, 0, $month2, 10))." $year2");
	$bhour2 = $hour2.':'.$minute2;

//	echo $bday1.'::'.$bday2.'<br/>';

if (!$aID1) {
	//error check
	$my_form = new Validate_fields;

	$my_form->check_4html = true;

	$my_form->add_text_field("Name", $name1, "text", "y", 40);

	$my_form->add_text_field("Month", $month1, "text", "y", 2);
	$my_form->add_text_field("Day", $day1, "text", "y", 2);
	$my_form->add_text_field("Year", $year1, "text", "y", 4);

	$my_form->add_text_field("Hour", $hour1, "text", "y", 2);
	$my_form->add_text_field("Minute", $minute1, "text", "y", 2);

	$my_form->add_text_field("Time zone", $timezone1, "text", "y", 4);

	$my_form->add_text_field("Longitude degree", $long_deg1, "text", "y", 3);
	$my_form->add_text_field("Longitude minute", $long_min1, "text", "y", 2);
	$my_form->add_text_field("Longitude E/W", $ew1, "text", "y", 2);

	$my_form->add_text_field("Latitude degree", $lat_deg1, "text", "y", 2);
	$my_form->add_text_field("Latitude minute", $lat_min1, "text", "y", 2);
	$my_form->add_text_field("Latitude N/S", $ns1, "text", "y", 2);

	// additional error checks on user-entered data
	if ($month1 == 0) $my_error .= "Please enter a month.<br>";

	if ($month1 != "" And $day1 != "" And $year1 != "") {
		if (!$date1 = checkdate(settype ($month1, "integer"), settype ($day1, "integer"), settype ($year1, "integer")))
			$my_error .= "The date of birth you entered is not valid.<br>";
	}

	if (($year1 < 1900) Or ($year1 >= 2100))
		$my_error .= "Please enter a year between 1900 and 2099.<br>";

	if (($hour1 < 0) Or ($hour1 > 23))
		$my_error .= "Birth hour must be between 0 and 23.<br>";

	if (($minute1 < 0) Or ($minute1 > 59))
		$my_error .= "Birth minute must be between 0 and 59.<br>";

	if (($long_deg1 < 0) Or ($long_deg1 > 179))
		$my_error .= "Longitude degrees must be between 0 and 179.<br>";

	if (($long_min1 < 0) Or ($long_min1 > 59))
		$my_error .= "Longitude minutes must be between 0 and 59.<br>";

	if (($lat_deg1 < 0) Or ($lat_deg1 > 65))
		$my_error .= "Latitude degrees must be between 0 and 65.<br>";

	if (($lat_min1 < 0) Or ($lat_min1 > 59))
		$my_error .= "Latitude minutes must be between 0 and 59.<br>";

	if (($ew1 == '-1') And ($timezone1 > 2))
		$my_error .= "You have marked West longitude but set an east time zone.<br>";

	if (($ew1 == '1') And ($timezone1 < 0))
		$my_error .= "You have marked East longitude but set a west time zone.<br>";

	if ($ew1 < 0) $ew_txt1 = "w";
	else $ew_txt1 = "e";

	if ($ns1 > 0) $ns_txt1 = "n";
	else $ns_txt1 = "s";

	$validation_error = $my_form->validation();
}
if (!$aID2) {
	//error check
	$my_form = new Validate_fields;

	$my_form->check_4html = true;

	$my_form->add_text_field("Name", $name2, "text", "y", 40);

	$my_form->add_text_field("Month", $month2, "text", "y", 2);
	$my_form->add_text_field("Day", $day2, "text", "y", 2);
	$my_form->add_text_field("Year", $year2, "text", "y", 4);

	$my_form->add_text_field("Hour", $hour2, "text", "y", 2);
	$my_form->add_text_field("Minute", $minute2, "text", "y", 2);

	$my_form->add_text_field("Time zone", $timezone2, "text", "y", 4);

	$my_form->add_text_field("Longitude degree", $long_deg2, "text", "y", 3);
	$my_form->add_text_field("Longitude minute", $long_min2, "text", "y", 2);
	$my_form->add_text_field("Longitude E/W", $ew2, "text", "y", 2);

	$my_form->add_text_field("Latitude degree", $lat_deg2, "text", "y", 2);
	$my_form->add_text_field("Latitude minute", $lat_min2, "text", "y", 2);
	$my_form->add_text_field("Latitude N/S", $ns2, "text", "y", 2);

	// additional error checks on user-entered data
	if ($month == 0) $my_error .= "Please enter a month.<br>";

	if ($month2 != "" And $day != "" And $year2 != "") {
		if (!$date2 = checkdate(settype ($month2, "integer"), settype ($day2, "integer"), settype ($year2, "integer")))
			$my_error .= "The date of birth you entered is not valid.<br>";
	}

	if (($year2 < 1900) Or ($year2 >= 2100))
		$my_error .= "Please enter a year between 1900 and 2099.<br>";

	if (($hour2 < 0) Or ($hour2 > 23))
		$my_error .= "Birth hour must be between 0 and 23.<br>";

	if (($minute2 < 0) Or ($minute2 > 59))
		$my_error .= "Birth minute must be between 0 and 59.<br>";

	if (($long_deg2 < 0) Or ($long_deg2 > 179))
		$my_error .= "Longitude degrees must be between 0 and 179.<br>";

	if (($long_min2 < 0) Or ($long_min2 > 59))
		$my_error .= "Longitude minutes must be between 0 and 59.<br>";

	if (($lat_deg2 < 0) Or ($lat_deg2 > 65))
		$my_error .= "Latitude degrees must be between 0 and 65.<br>";

	if (($lat_min2 < 0) Or ($lat_min2 > 59))
		$my_error .= "Latitude minutes must be between 0 and 59.<br>";

	if (($ew2 == '-1') And ($timezone2 > 2))
		$my_error .= "You have marked West longitude but set an east time zone.<br>";

	if (($ew2 == '1') And ($timezone2 < 0))
		$my_error .= "You have marked East longitude but set a west time zone.<br>";

	if ($ew2 < 0) $ew_txt2 = "w";
	else $ew_txt2 = "e";

	if ($ns2 > 0) $ns_txt2 = "n";
	else $ns_txt2 = "s";

	$validation_error = $my_form->validation();
}

//if ($aID1 && $aID2) $ok = true;

if ((!$aID1 || !$aID2) && ((!$validation_error) || ($my_error != ""))) {
	$ok = false;
	$error = $my_form->create_msg();
//	echo '<div class="alerts alert-error"><b>Error! - The following error(s) occurred</b><br/>';
	if ($error) echo $error . $my_error;
	else echo $error . "<br>" . $my_error;
} else {
	$my_longitude1 = $ew1 * ($long_deg1 + ($long_min1 / 60));
	$my_latitude1 = $ns1 * ($lat_deg1 + ($lat_min1 / 60));

	$my_longitude2 = $ew2 * ($long_deg2 + ($long_min2 / 60));
	$my_latitude2 = $ns2 * ($lat_deg2 + ($lat_min2 / 60));

	$name = $name1.'::'.$name2;
	$gender = $gender1.'::'.$gender2;
	$bday = $bday1.'::'.$bday2;
	$bhour = $bhour1.'::'.$bhour2;
	$timezone = $timezone1.'::'.$timezone2;
	$country = $country1.'::'.$country2;
	$town = $town1.'::'.$town2;
	$ew_txt = $ew_txt1.'::'.$ew_txt2;
	$long_deg = $long_deg1.'::'.$long_deg2;
	$long_min = $long_min1.'::'.$long_min2;
//	$my_longitude = $my_longitude1.'::'.$my_longitude2;
	$ns_txt = $ns_txt1.'::'.$ns_txt2;
//	$my_latitude = $my_latitude1.'::'.$my_latitude2;
	$lat_deg = $lat_deg1.'::'.$lat_deg2;
	$lat_min = $lat_min1.'::'.$lat_min2;

	$name_ = $name2.'::'.$name1;
	$gender_ = $gender2.'::'.$gender1;
	$bday_ = $bday2.'::'.$bday1;
	$bhour_ = $bhour2.'::'.$bhour1;
	$timezone_ = $timezone2.'::'.$timezone1;
	$country_ = $country2.'::'.$country1;
	$town_ = $town2.'::'.$town1;
	$ew_txt_ = $ew_txt2.'::'.$ew_txt1;
	$long_deg_ = $long_deg2.'::'.$long_deg1;
	$long_min_ = $long_min2.'::'.$long_min1;
	$ns_txt_ = $ns_txt2.'::'.$ns_txt1;
	$lat_deg_ = $lat_deg2.'::'.$lat_deg1;
	$lat_min_ = $lat_min2.'::'.$lat_min1;
}
if ($aID1 && $aID2) {
	$aID = $aID1.'::'.$aID2;
	$aID_ = $aID2.'::'.$aID1;
} else if ($aID1) $aID = $aID1.'::0';
else if ($aID2) $aID = '0::'.$aID2;
if (($bday1 != $bday2) || ($bhour1 != $bhour2) || ($timezone1 != $timezone2) || ($ns_txt1 != $ns_txt2) || ($ew_txt1 != $ew_txt2) || ($my_longitude1 != $my_longitude2) || ($my_latitude1 != $my_latitude2) ) $ok = true;
else echo 'Two people must be different.';

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
			);
		$valAr_ = 
			array(
				'aid' => $aID_,
				'name' => $name_,
				'gender' => $gender_,
				'birthday' => $bday_,
				'birthhour' => $bhour_,
				'timezone' => $timezone_,
				'country' => $country_,
				'town' => $town_,
				'long_deg' => $long_deg_,
				'lat_deg' => $lat_deg_,
				'long_min' => $long_min_,
				'lat_min' => $lat_min_,
				'ew' => $ew_txt_,
				'ns' => $ns_txt_
			);
		createChart($tb, $valAr, $valAr_);
	}
} ?>
