<? if (!$_DATA) {
$name = $_COOKIE['name'.$p];
$gender = $_COOKIE['gender'.$p];
$day = $_COOKIE['day'.$p];
$month = $_COOKIE['month'.$p];
$year = $_COOKIE['year'.$p];
$hour = $_COOKIE['hour'.$p];
$minute = $_COOKIE['minute'.$p];
$lat_min = $_COOKIE['lat_min'.$p];
$lat_deg = $_COOKIE['lat_deg'.$p];
$long_min = $_COOKIE['long_min'.$p];
$long_deg = $_COOKIE['long_deg'.$p];
$ew = $_COOKIE['ew'.$p];
$ns = $_COOKIE['ns'.$p];
$timezone = $_COOKIE['timezone'.$p];
$country = $_COOKIE['country'.$p];
$town = $_COOKIE['town'.$p];
} else {
$name = $_DATA['name'];
$gender = $_DATA['gender'];
$bday = $_DATA['birthday'];
$day = date('d', $bday);
$month = (int)date('m', $bday);
$year = date('Y', $bday);
$hour = explode(':', $_DATA['birthhour'])[0];
$minute = explode(':', $_DATA['birthhour'])[1];
$long_deg = DECtoDMS(explode('|', $_DATA['long'])[1])['deg'];
$long_min = DECtoDMS(explode('|', $_DATA['long'])[1])['min'];
$lat_deg = DECtoDMS(explode('|', $_DATA['lat'])[1])['deg'];
$lat_min = DECtoDMS(explode('|', $_DATA['lat'])[1])['min'];
$ns_txt = explode('|', $_DATA['lat'])[0];
$ew_txt = explode('|', $_DATA['long'])[0];
$country = $_DATA['country'];
$town = $_DATA['town'];
$timezone = $_DATA['timezone'];
}
?>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Name</div>
		<div class="col-lg-9"><input type="text" name="name<? echo $p ?>" value="<? echo $name ?>" placeholder="Name"/></div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding">Gender</div>
		<div class="col-lg-9">
			<label class="radio">
				<input type="radio" value="f" <? if ($gender == 'f') echo 'checked' ?> name="gender<? echo $p ?>"/> Female
			</label>
			<label class="radio">
				<input type="radio" value="m" <? if ($gender == 'm') echo 'checked' ?> name="gender<? echo $p ?>"/> Male
			</label>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Birthday</div>
		<div class="col-lg-9">
			<input name="day<? echo $p ?>" size="3" value="<? echo $day ?>" maxlength="2" type="number" min="1" max="31" placeholder="dd">
			<select id="month<? echo $p ?>" name="month<? echo $p ?>">
				<option <? if (!$month) echo 'selected' ?> value="1">January</option>
				<option value="2">February</option>
				<option value="3">March</option>
				<option value="4">April</option>
				<option value="5">May</option>
				<option value="6">June</option>
				<option value="7">July</option>
				<option value="8">August</option>
				<option value="9">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
			</select>
			<? if ($month) echo '<script>document.getElementById("month'.$p.'").value="'.$month .'";</script>' ?>
			<input value="<? echo $year ?>" name="year<? echo $p ?>" size="7" maxlength="4" placeholder="YYYY">
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Birth-hour</div>
		<div class="col-lg-9">
			<select class="hour" id="hour<? echo $p ?>" name="hour<? echo $p ?>">
				<option <? if (!$hour) echo 'selected' ?> value="0">0 [12 midnight]</option>
				<option value="1">1 [am]</option>
				<option value="2">2 [am]</option>
				<option value="3">3 [am]</option>
				<option value="4">4 [am]</option>
				<option value="5">5 [am]</option>
				<option value="6">6 [am]</option>
				<option value="7">7 [am]</option>
				<option value="8">8 [am]</option>
				<option value="9">9 [am]</option>
				<option value="10">10 [am]</option>
				<option value="11">11 [am]</option>
				<option value="12">12 [noon]</option>
				<option value="13">13 [1 pm]</option>
				<option value="14">14 [2 pm]</option>
				<option value="15">15 [3 pm]</option>
				<option value="16">16 [4 pm]</option>
				<option value="17">17 [5 pm]</option>
				<option value="18">18 [6 pm]</option>
				<option value="19">19 [7 pm]</option>
				<option value="20">20 [8 pm]</option>
				<option value="21">21 [9 pm]</option>
				<option value="22">22 [10 pm]</option>
				<option value="23">23 [11 pm]</option>
			</select>
			<? if ($hour) echo '<script>document.getElementById("hour'.$p.'").value="'.$hour .'";</script>' ?>
			:
			<input class="min" value="<? echo $minute ?>" name="min<? echo $p ?>" size="5" maxlength="2">
			<label class="checkbox unknown-hr right">
				<input type="checkbox" value="-1" <? if ($hour && $hour == 0) echo 'checked' ?> name="hour<? echo $p ?>"/> Unknown
			</label>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Birth place</div>
		<div class="col-lg-5 no-padding-right">
			<input class="form-control" type="text" id="town" name="town<? echo $p ?>" value="<? echo $town ?>" placeholder="Town/City"/>
		</div>
		<div class="col-lg-4">
			<input class="form-control" readonly type="text" name="country<? echo $p ?>" value="<? echo $country ?>" placeholder="Country"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding"></div>
		<div class="col-lg-9 birth-place-info"></div>
		<div class="clearfix"></div>
	</div>
<!--	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Birth place</div>
		<div class="col-lg-9">
			<input class="form-control" id="villeAutocomplete" type="text" name="ville<? echo $p ?>">
		</div>
		<div class="clearfix"></div>
	</div> -->
	<input type="hidden" value="<? echo $long_deg ?>" name="long_deg<? echo $p ?>"/>
	<input type="hidden" value="<? echo $long_min ?>" name="long_min<? echo $p ?>"/>
	<input type="hidden" value="<? echo $ew ?>" name="ew<? echo $p ?>"/>
	<input type="hidden" value="<? echo $lat_deg ?>" name="lat_deg<? echo $p ?>"/>
	<input type="hidden" value="<? echo $lat_min ?>" name="lat_min<? echo $p ?>"/>
	<input type="hidden" value="<? echo $ns ?>" name="ns<? echo $p ?>"/>
	<input type="hidden" value="<? echo $timezone ?>" name="timezone<? echo $p ?>"/>
<!--	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Timezone</div>
		<div class="col-lg-9">
			<select class="form-control" id="timezone<? echo $p ?>" name="timezone<? echo $p ?>">
				<option value="" selected=""> Select Time Zone </option>
				<option value="-12">GMT -12:00 hrs - IDLW</option>
				<option value="-11">GMT -11:00 hrs - BET or NT</option>
				<option value="-10.5">GMT -10:30 hrs - HST</option>
				<option value="-10">GMT -10:00 hrs - AHST</option>
				<option value="-9.5">GMT -09:30 hrs - HDT or HWT</option>
				<option value="-9">GMT -09:00 hrs - YST or AHDT or AHWT</option>
				<option value="-8">GMT -08:00 hrs - PST or YDT or YWT</option>
				<option value="-7">GMT -07:00 hrs - MST or PDT or PWT</option>
				<option value="-6">GMT -06:00 hrs - CST or MDT or MWT</option>
				<option value="-5">GMT -05:00 hrs - EST or CDT or CWT</option>
				<option value="-4">GMT -04:00 hrs - AST or EDT or EWT</option>
				<option value="-3.5">GMT -03:30 hrs - NST</option>
				<option value="-3">GMT -03:00 hrs - BZT2 or AWT</option>
				<option value="-2">GMT -02:00 hrs - AT</option>
				<option value="-1">GMT -01:00 hrs - WAT</option>
				<option value="0">Greenwich Mean Time - GMT or UT</option>
				<option value="1">GMT +01:00 hrs - CET or MET or BST</option>
				<option value="2">GMT +02:00 hrs - EET or CED or MED or BDST or BWT</option>
				<option value="3">GMT +03:00 hrs - BAT or EED</option>
				<option value="3.5">GMT +03:30 hrs - IT</option>
				<option value="4">GMT +04:00 hrs - USZ3</option>
				<option value="5">GMT +05:00 hrs - USZ4</option>
				<option value="5.5">GMT +05:30 hrs - IST</option>
				<option value="6">GMT +06:00 hrs - USZ5</option>
				<option value="6.5">GMT +06:30 hrs - NST</option>
				<option value="7">GMT +07:00 hrs - SST or USZ6</option>
				<option value="7.5">GMT +07:30 hrs - JT</option>
				<option value="8">GMT +08:00 hrs - AWST or CCT</option>
				<option value="8.5">GMT +08:30 hrs - MT</option>
				<option value="9">GMT +09:00 hrs - JST or AWDT</option>
				<option value="9.5">GMT +09:30 hrs - ACST or SAT or SAST</option>
				<option value="10">GMT +10:00 hrs - AEST or GST</option>
				<option value="10.5">GMT +10:30 hrs - ACDT or SDT or SAD</option>
				<option value="11">GMT +11:00 hrs - UZ10 or AEDT</option>
				<option value="11.5">GMT +11:30 hrs - NZ</option>
				<option value="12">GMT +12:00 hrs - NZT or IDLE</option>
				<option value="12.5">GMT +12:30 hrs - NZS</option>
				<option value="13">GMT +13:00 hrs - NZST</option>
			</select>
			<script>document.getElementById('timezone<? echo $p ?>').value='<? echo $timezone ?>';</script>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Logtitude</div>
		<div class="col-lg-9">
			<input maxlength="3" size="3" value="<? echo $long_deg ?>" name="long_deg<? echo $p ?>"/>
			<select name="ew<? echo $p ?>">
				<option value="1">E</option> <option value="-1">W</option>
			</select>
			<script>document.getElementById('ew<? echo $p ?>').value='<? echo $ew ?>';</script>
			<input maxlength="2" size="2" value="<? echo $long_min ?>" name="long_min<? echo $p ?>"/>
			<br/><font color="#0000ff">(example: Chicago is 87 W 39, Sydney is 151 E 13)</font>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Latitude</div>
		<div class="col-lg-9">
			<input maxlength="3" size="3" value="<? echo $lat_deg ?>" name="lat_deg<? echo $p ?>"/>
			<select name="ns<? echo $p ?>">
				<option value="1">N</option> <option value="-1">S</option>
			</select>
			<script>document.getElementById('ew<? echo $p ?>').value='<? echo $ns ?>';</script>
			<input maxlength="2" size="2" value="<? echo $lat_min ?>" name="lat_min<? echo $p ?>"/>
			<br/><font color="#0000ff">(example: Chicago is 41 N 51, Sydney is 33 S 52)</font>
		</div>
		<div class="clearfix"></div>
	</div> -->

<? //if (!in_array('https://maps.googleapis.com/maps/api/js?sensor=false', $externalJs)) $externalJs[] = 'https://maps.googleapis.com/maps/api/js?sensor=false';
if (!in_array(JS.'/form.js', $externalJs)) $externalJs[] = JS.'/form.js';
