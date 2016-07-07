<? $cData0 = "rx1=$rx1&p1=$ser_L1&hc1=$ser_hc1&hpos=$ser_hpos";
$cData1 = "rx1=$rx1&rx2=$rx2&p1=$ser_L1&p2=$ser_L2&hc1=$ser_hc1&ubt1=$ubt1&ubt2=$ubt2"; ?>
	<div class="chart-info">
		<h2><? echo $restored_name ?></h2>
		<? chartStt($cIn) ?>
	</div>
	<div id="m_tab">
		<div class="m_tab">
			<div class="tab active" id="c-images">Natal wheel</div>
			<div class="tab" id="c-aspect">Aspects</div>
			<div class="tab" id="c-natal">Data</div>
		</div>
<? /* if (!file_exists($chartwheel_filename)) $cWheel = $asLink.'/natal_wheel_1.php?'.$cData0;
else $cWheel = $chartwheel_fileurl;
if (!file_exists($grids_filename)) $cAspect = $asLink.'/natal_aspect_grid.php?'.$cData1;
else $cAspect = $grids_fileurl;
*/
$cWheel = $asLink.'/natal_wheel_1.php?'.$cData0;
$cAspect = $asLink.'/natal_aspect_grid.php?'.$cData1;
 ?>
		<div class="chart-canvas tab-index c-images">
			<div class="chart-wheel">
				<img src='<? echo $cWheel ?>'>
			</div>
		</div>

		<div class="hide chart-canvas tab-index c-aspect">
			<div class="chart-aspect">
				<img src='<? echo $cAspect ?>'>
<!--				<img src='<? echo $asLink.'/natal_table.php?'.$cData0 ?>'> -->
			</div>
		</div>

		<div class="hide chart-canvas tab-index c-natal">
<? $sigAr = $plAr = $hsAr = array();
foreach ($sign_name as $i => $sig) {
	if (!array_key_exists($sig, $sigAr)) $sigAr[$sig] = 0;
}
foreach ($pl_name as $i => $pln) {
	if ($i <= 12 && !array_key_exists($pln, $plAr)) $plAr[$pln] = 0;
} ?>
			<table width="100%" class="natal_table" cellpadding="0" cellspacing="0" border="0">
				<thead>
					<td>&nbsp;</td>
					<td><font color='#0000ff'><b> C </b></font></td>
					<td><font color='#0000ff'><b> F </b></font></td>
					<td><font color='#0000ff'><b> M </b></font></td>
				</thead>
<? $clr = array('Fire' => 'df3222', 'Earth' => '09a909', 'Water' => '43c7f0', 'Air' => 'ff6510');
foreach ($elements as $ele => $eAr) { ?>
				<tr><td><font color='#<? echo $clr[$ele] ?>'><b> <? echo $ele ?> </b></font></td>
<? foreach ($qualities as $qk => $qAr) { ?>
					<td>
					<? for ($i = 0; $i < 14; $i++) {
						$s_pos = floor($longitude1[$i] / 30) + 1;
						$sigi = $sign_name[$s_pos];
						$pln = $pl_name[$i];
						if (in_array($sigi, $qAr) && in_array($sigi, $eAr)) echo '<font color="#'. $clr[$ele] .'"><img src="'.$asLink.'/natal_planet.php?g='.$i.'&clr='.$clr[$ele].'" title="'.trendCode($pln).'"/></font>';
					} ?>
					</td>
<? } ?>
				</tr>
<? } ?>
			</table>
			<table width="100%" cellpadding="0" cellspacing="0" border="0">
				<thead>
					<td><font color='#0000ff'><b> Planet </b></font></td>
					<td><font color='#0000ff'><b> Longitude </b></font></td>
				<?	if ($ubt1 == 1) echo "<td>&nbsp;</td>";
					else echo "<td><font color='#0000ff'><b> House position </b></font></td>"; ?>
				</thead>
<? 	for ($i = 0; $i <= $a1; $i++) {
		$s_pos = floor($longitude1[$i] / 30) + 1;
		$sigi = $sign_name[$s_pos];
		$sigAr[$sigi]++;
		$pli = $pl_name[$i];
		if (check($crAr[$sigi], $pli)) $plAr[$pli]++;
		echo '<tr>';
		echo "<td>" . $pli . "</td>";
		echo "<td>" . Convert_Longitude($longitude1[$i]) . " " . Mid($rx1, $i + 1, 1) . "</td>";
		if ($ubt1 == 1) echo "<td>&nbsp;</td>";
		else {
			$hse = floor($house_pos1[$i]);
			$hsAr[$hse]++;
			echo "<td align='center'>" . $hse . "</td>";
		}
		echo '</tr>';
	} ?>
				<tr><td> &nbsp; </td><td> &nbsp; </td><td> &nbsp; </td></tr>
			</table>

<?	if ($ubt1 == 0) {
		echo '<table width="100%" cellpadding="0" cellspacing="0" border="0">';
		echo '<thead>';
			echo "<td><font color='#0000ff'><b> House </b></font></td>";
			echo "<td><font color='#0000ff'><b> Longitude </b></font></td>";
//			echo "<td> &nbsp </td>";
		echo '</thead>';

		for ($i = LAST_PLANET + 1; $i <= LAST_PLANET + 12; $i++) {
			echo '<tr>';
			if ($i == LAST_PLANET + 1) echo "<td>Ascendant </td>";
			else if ($i == LAST_PLANET + 10) echo "<td>MC (Midheaven) </td>";
			else echo "<td>House " . ($i - LAST_PLANET) . "</td>";

			echo "<td>" . Convert_Longitude($longitude1[$i]) . "</td>";
//			echo "<td> &nbsp </td>";
			echo '</tr>';
		}
		echo '<tr><td> &nbsp; </td><td> &nbsp; </td></tr>';
		echo '</table>';
	} ?>
		</div>
	</div>

<? //$sections = array('overview', 'philosophy', 'planets', 'rising', 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'house', 'aspects');
$sections = array('overview', 'sun', 'love', 'moon', 'rising', 'midheaven', 'planets', 'house', 'aspects', 'dominant'); ?>
