<? include 'config.php';
include 'html_dom.php';
function get_lonlat ($addr) {
	try {
		$coordinates = @file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($addr) . '&sensor=true');
		$e = json_decode($coordinates);
		// call to google api failed so has ZERO_RESULTS -- i.e. rubbish address...
		if (isset($e->status)) {
			if ($e->status == 'ZERO_RESULTS') $err_res = true; 
			else $err_res=false;
		} else $err_res = false;
		// $coordinates is false if file_get_contents has failed so create a blank array with Longitude/Latitude.
		if ($coordinates == false || $err_res == true) {
			$a = array('lat' => 0, 'lng' => 0);
			$coordinates = new stdClass();
			foreach ($a as $key => $value) {
				$coordinates->$key = $value;
			}
		} else {
			// call to google ok so just return longitude/latitude.
			$coordinates = $e;
			$formatted_address = explode(', ', $coordinates->results[0]->formatted_address);
			$coors['city'] = $formatted_address[0];
			$coors['country'] = end($formatted_address);
			$coors['location'] = $coordinates->results[0]->geometry->location;
//			$coors = $coordinates->results[0];
		}
		$coors = json_decode(json_encode($coors), true);
		$lat = $coors['location']['lat'];
		$lng = $coors['location']['lng'];

		$url = "https://maps.googleapis.com/maps/api/timezone/json?timestamp=1331161200&location={$lat},{$lng}&sensor=false";
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_REFERER, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
		$str = curl_exec($curl);
		curl_close($curl);
		$html_base = new simple_html_dom();
		$html_base->load($str);
		$timez = json_decode($html_base);
		$tzID = $timez->timeZoneId;
//		$tzID = 'America/Los_Angeles';
		$time = new DateTime('now', new DateTimeZone($tzID));
		$timezoneOffset = $time->format('P');
		$tzAr = explode(':', $timezoneOffset);
		$tz = (int)$tzAr[0];
		if ($tzAr[1] == 30) $tz .= '.5';
		$coors['tzReal'] = $timezoneOffset;
		$coors['timezone'] = $tz;
		return $coors;
	}
	catch (Exception $e) {
	}
}

//$city = $_GET['city'];
$city = $_POST['city'];
$vil = get_lonlat($city);
//print_r($vil);
$adr = $vil['location'];
$lat = $adr['lat'];
$lng = $adr['lng'];
$address = array();

$latAr = DECtoDMS($lat);
$address['lat_deg'] = $latAr['deg'];
$address['lat_min'] = $latAr['min'];
if ($lat > 0) {
	$address['ns'] = 1;
	$address['ns_txt'] = 'n';
} else {
	$address['ns'] = -1;
	$address['ns_txt'] = 's';
}

$lngAr = DECtoDMS($lng);
$address['long_deg'] = $lngAr['deg'];
$address['long_min'] = $lngAr['min'];
if ($lng > 0) {
	$address['ew'] = 1;
	$address['ew_txt'] = 'e';
} else {
	$address['ew'] = -1;
	$address['ew_txt'] = 'w';
}

$address['city'] = $vil['city'];
$address['country'] = $vil['country'];
$address['timezone'] = $vil['timezone'];
$address['tzReal'] = $vil['tzReal'];
//$address['timezone'] = geoip_time_zone_by_country_and_region(geoip_country_code_by_name($city));
echo json_encode($address);
