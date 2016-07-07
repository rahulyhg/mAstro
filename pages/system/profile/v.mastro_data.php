<?
	$h_sys = safeEscapeString($_POST["h_sys"]);
	$name = safeEscapeString($_POST["name"]);
	$gender = safeEscapeString($_POST["gender"]);

	$month = safeEscapeString($_POST["month"]);
	$day = safeEscapeString($_POST["day"]);
	$year = safeEscapeString($_POST["year"]);

	$hour = safeEscapeString($_POST["hour"]);
	$minute = safeEscapeString($_POST["min"]);

	$timezone = safeEscapeString($_POST["timezone"]);
	$country = safeEscapeString($_POST["country"]);
	$town = safeEscapeString($_POST["town"]);

	$long_deg = safeEscapeString($_POST["long_deg"]);
	$long_min = safeEscapeString($_POST["long_min"]);
	$ew = safeEscapeString($_POST["ew"]);

	$lat_deg = safeEscapeString($_POST["lat_deg"]);
	$lat_min = safeEscapeString($_POST["lat_min"]);
	$ns = safeEscapeString($_POST["ns"]);
/*
include MAIN_PATH.'/lib/html_dom.php';
$url = 'http://www.astro.com/cgi/aq.cgi?country_list=&expr='.urlencode($town).'&submit=Search&lang=e';
$html = new simple_html_dom();
$html->load_file($url);
$content = '';
$strongAr = array();
$lnglat = $llA = array();
foreach ($html->find('ol') as $ol) {
	foreach ($ol->find('b') as $b) {
		$txt = $b->plaintext;
		$llA[] = $txt;
	}
}
foreach ($llA as $i => $ll) {
	$lAr = preg_split('/(n|s|e|w)/', $ll);
	$deg = $lAr[0];
	$min = $lAr[1];
	preg_match('/(n|s|e|w)/', $ll, $m);
	$txt = $m[0];
	if ($i == 0) $k = 'lat';
	else $k = 'long';
	$lnglat[$k] = array('deg' => $deg, 'min' => $min, 'txt' => $txt);
}
		$long_deg = safeEscapeString($lnglat['long']['deg']);
		$long_min = safeEscapeString($lnglat['long']['min']);
		$ew = safeEscapeString($lnglat['long']['txt']);

		$lat_deg = safeEscapeString($lnglat['lat']['deg']);
		$lat_min = safeEscapeString($lnglat['lat']['min']);
		$ns = safeEscapeString($lnglat['lat']['txt']);
*/

	$bday = strtotime("$day ".date('F', mktime(0, 0, 0, $month, 10))." $year");
	$bhour = $hour.':'.$minute;

	//error check
	$my_form = new Validate_fields;

	$my_form->check_4html = true;

	$my_form->add_text_field("Name", $name, "text", "y", 40);

	$my_form->add_text_field("Month", $month, "text", "y", 2);
	$my_form->add_text_field("Day", $day, "text", "y", 2);
	$my_form->add_text_field("Year", $year, "text", "y", 4);

	$my_form->add_text_field("Hour", $hour, "text", "y", 2);
	$my_form->add_text_field("Minute", $minute, "text", "y", 2);

	$my_form->add_text_field("Time zone", $timezone, "text", "y", 4);

	$my_form->add_text_field("Longitude degree", $long_deg, "text", "y", 3);
	$my_form->add_text_field("Longitude minute", $long_min, "text", "y", 2);
	$my_form->add_text_field("Longitude E/W", $ew, "text", "y", 2);

	$my_form->add_text_field("Latitude degree", $lat_deg, "text", "y", 2);
	$my_form->add_text_field("Latitude minute", $lat_min, "text", "y", 2);
	$my_form->add_text_field("Latitude N/S", $ns, "text", "y", 2);

	// additional error checks on user-entered data
	if ($month == 0)
	  $my_error .= "Please enter a month.<br>";

	if ($month != "" And $day != "" And $year != "") {
		if (!$date = checkdate(settype ($month, "integer"), settype ($day, "integer"), settype ($year, "integer")))
			$my_error .= "The date of birth you entered is not valid.<br>";
	}

	if (($year < 1900) Or ($year >= 2100))
		$my_error .= "Please enter a year between 1900 and 2099.<br>";

	if (($hour < 0) Or ($hour > 23))
		$my_error .= "Birth hour must be between 0 and 23.<br>";

	if (($minute < 0) Or ($minute > 59))
		$my_error .= "Birth minute must be between 0 and 59.<br>";

	if (($long_deg < 0) Or ($long_deg > 179))
		$my_error .= "Longitude degrees must be between 0 and 179.<br>";

	if (($long_min < 0) Or ($long_min > 59))
		$my_error .= "Longitude minutes must be between 0 and 59.<br>";

	if (($lat_deg < 0) Or ($lat_deg > 65))
		$my_error .= "Latitude degrees must be between 0 and 65.<br>";

	if (($lat_min < 0) Or ($lat_min > 59))
		$my_error .= "Latitude minutes must be between 0 and 59.<br>";

	if (($ew == '-1') And ($timezone > 2))
		$my_error .= "You have marked West longitude but set an east time zone.<br>";

	if (($ew == '1') And ($timezone < 0))
		$my_error .= "You have marked East longitude but set a west time zone.<br>";

	if ($ew < 0) $ew_txt = "w";
	else $ew_txt = "e";

	if ($ns > 0) $ns_txt = "n";
	else $ns_txt = "s";

	$validation_error = $my_form->validation();

if ((!$validation_error) || ($my_error != "")) {
	$error = $my_form->create_msg();
//	echo '<div class="alerts alert-error"><b>Error! - The following error(s) occurred</b><br/>';

	if ($error) echo $error . $my_error;
	else echo $error . "<br>" . $my_error;

//	echo "<br>Please re-enter your timezone data.<br><br>";
//	echo '</div>';
} else {
	$my_longitude = $ew * ($long_deg + ($long_min / 60));
	$my_latitude = $ns * ($lat_deg + ($lat_min / 60));

	if ($m) {
		$ins = changeValue('astro_data', "`id` = '{$m}' ", "`uid` = '{$u}' AND `name` = '{$name}' AND `gender` = '{$gender}' AND `birthday` = '{$bday}' AND `birthhour` = '{$bhour}' AND `timezone` = '{$timezone}' AND `country` = '{$country}' AND `town` = '{$town}' AND `long_deg` = '{$long_deg}' AND `lat_deg` = '{$lat_deg}' AND `long_min` = '{$long_min}' AND `lat_min` = '{$lat_min}' AND `ew` = '{$ew_txt}' AND `ns` = '{$ns_txt}' ");
	} else {
		$cIn = getRecord('astro_data', "`uid` = '{$u}' AND `name` = '{$name}' AND `gender` = '{$gender}' AND `birthday` = '{$bday}' AND `birthhour` = '{$bhour}' AND `timezone` = '{$timezone}' AND `country` = '{$country}' AND `town` = '{$town}' AND `long_deg` = '{$long_deg}' AND `lat_deg` = '{$lat_deg}' AND `long_min` = '{$long_min}' AND `lat_min` = '{$lat_min}' AND `ew` = '{$ew_txt}' AND `ns` = '{$ns_txt}' ");
		if (!$cIn['id']) {
			$nn = countRecord('astro_data', "`uid` = '{$u}' ") + 1;
			$ins = insert('astro_data', "`name`, `uid`, `uname`, `n`, `gender`, `birthday`, `birthhour`, `timezone`, `long_deg`, `long_min`, `lat_deg`, `lat_min`, `ew`, `ns`, `country`, `town`, `time`, `last_updated`", " '{$name}', '{$u}', '{$member['username']}', '{$nn}', '{$gender}', '{$bday}', '{$bhour}', '{$timezone}', '{$long_deg}', '{$long_min}', '{$lat_deg}', '{$lat_min}', '{$ew_txt}', '{$ns_txt}', '{$country}', '{$town}', '{$current}', '{$current}' ");
		}
	}
	if ($ins) echo 0;
	else echo $er[000];
}
?>
