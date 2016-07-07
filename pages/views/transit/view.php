<div class="col-lg-7 no-padding-left">
<form class="chart-inputs" action="?do=caculate" method="post" name="caculate">
	<h3><? echo $lang['Generate new chart'] ?></h3>
	<? include 'pages/views/chartView.php' ?>
	<div class="form-group">
		<div class="col-lg-3 no-padding control-label">Progressed date</div>
		<div class="col-lg-9">
			<input size="2" maxlength="2" name="start_day" value="<? echo date('d') ?>" placeholder="Day">
			<select name="start_month" id="start_month"><option value="0">Choose month</option>
				<option value="1">January</option>
				<option value="2">February</option>
				<option value="3">March</option>
				<option value="4">April</option>
				<option value="5" selected="selected">May</option>
				<option value="6">June</option>
				<option value="7">July</option>
				<option value="8">August</option>
				<option value="9">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
				<script>document.getElementById('start_month').value='<? echo (int)date('m') ?>';</script>
			</select>
			<input size="4" maxlength="4" name="start_year" value="<? echo date('Y') ?>" placeholder="Year"><br/>
			<font color="#0000ff">(only years from 1900 through 2099 are valid)</font>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="add-form-submit center">
		<input type="reset" value="Reset"/>
		<input type="submit" value="Submit"/>
	</div>
</form>

<div class="my-charts my-<? echo $tb ?>-charts">
	<h3 class="bor">My charts</h3>
	<div class="charts-list">
<? $cList = $getRecord -> GET($tb, "`uid` = '{$u}' ", 10, '`time` DESC');
foreach ($cList as $cO) {
	$startAr = explode('|', $cO['start']);
	if ($startAr[1] < 10) $startM = '0'.$startAr[1];
	else $startM = $startAr[1];
	$start = $startAr[0].'.'.$startM.'.'.$startAr[2] ?>
	<div class="c-one" style="background-image:url('<? echo IMG ?>/bg/tile-bg-<? echo rand(1,8) ?>.jpg')">
		<div class="c-info"><a href="<? echo $tLink.'/'.$cO['uname'].'/'.$cO['n'] ?>">
			<div class="c-name"><? echo $cO['name'] ?></div>
			<div class="c-time"><? echo $start ?></div>
		</a></div>
	</div>
<? } ?>
	</div>
</div>
</div>


<div class="chart-signs col-lg-5 no-padding-right">
	<div id="m_tab">
		<div class="m_tab">
			<div class="tab active" id="zodiac">Signs of Zodiac</div>
			<div class="tab" id="planets">Astrological planets</div>
			<div class="tab" id="aspect">Aspects</div>
		</div>
		<div class="tab-index zodiac">
	<table width="100%" class="wikitable" style="text-align:center">
<thead><tr>
<th>Symbol</th>
<th>Unicode<br>
Char</th>
<th>Sign names</th>
<th>Ruling<br>
celestial body<br>
<p>Classical</p>
</th>
<th>Ruling<br>
celestial body<br>
<p>Modern</p>
</th>
</tr></thead>
<tbody>
<tr>
<td><a href="/wiki/File:Aries.svg" class="image"><img alt="Aries.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Aries.svg/20px-Aries.svg.png" width="20" height="19" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Aries.svg/30px-Aries.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Aries.svg/40px-Aries.svg.png 2x" data-file-width="248" data-file-height="235"></a></td>
<td><span class="Unicode">♈</span></td>
<td><a href="/wiki/Aries_(astrology)" title="Aries (astrology)">Aries</a></td>
<td>Mars</td>
<td>Mars</td>
</tr>
<tr>
<td><a href="/wiki/File:Taurus.svg" class="image"><img alt="Taurus.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Taurus.svg/20px-Taurus.svg.png" width="20" height="21" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Taurus.svg/30px-Taurus.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Taurus.svg/40px-Taurus.svg.png 2x" data-file-width="225" data-file-height="235"></a></td>
<td><span class="Unicode">♉</span></td>
<td><a href="/wiki/Taurus_(astrology)" title="Taurus (astrology)">Taurus</a></td>
<td>Venus</td>
<td>Venus</td>
</tr>
<tr>
<td><a href="/wiki/File:Gemini.svg" class="image"><img alt="Gemini.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gemini.svg/20px-Gemini.svg.png" width="20" height="21" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gemini.svg/30px-Gemini.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gemini.svg/40px-Gemini.svg.png 2x" data-file-width="229" data-file-height="235"></a></td>
<td><span class="Unicode">♊</span></td>
<td><a href="/wiki/Gemini_(astrology)" title="Gemini (astrology)">Gemini</a></td>
<td>Mercury</td>
<td>Mercury</td>
</tr>
<tr>
<td><a href="/wiki/File:Cancer.svg" class="image"><img alt="Cancer.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cancer.svg/20px-Cancer.svg.png" width="20" height="16" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cancer.svg/30px-Cancer.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cancer.svg/40px-Cancer.svg.png 2x" data-file-width="300" data-file-height="235"></a></td>
<td><span class="Unicode">♋</span></td>
<td><a href="/wiki/Cancer_(astrology)" title="Cancer (astrology)">Cancer</a></td>
<td>Moon</td>
<td>Moon</td>
</tr>
<tr>
<td><a href="/wiki/File:Leo.svg" class="image"><img alt="Leo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/9/99/Leo.svg/20px-Leo.svg.png" width="20" height="26" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/9/99/Leo.svg/30px-Leo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/9/99/Leo.svg/40px-Leo.svg.png 2x" data-file-width="184" data-file-height="235"></a></td>
<td><span class="Unicode">♌</span></td>
<td><a href="/wiki/Leo_(astrology)" title="Leo (astrology)">Leo</a></td>
<td>Sun</td>
<td>Sun</td>
</tr>
<tr>
<td><a href="/wiki/File:Virgo.svg" class="image"><img alt="Virgo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Virgo.svg/20px-Virgo.svg.png" width="20" height="24" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Virgo.svg/30px-Virgo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Virgo.svg/40px-Virgo.svg.png 2x" data-file-width="194" data-file-height="235"></a></td>
<td><span class="Unicode">♍</span></td>
<td><a href="/wiki/Virgo_(astrology)" title="Virgo (astrology)">Virgo</a></td>
<td>Mercury</td>
<td>Mercury</td>
</tr>
<tr>
<td><a href="/wiki/File:Libra.svg" class="image"><img alt="Libra.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Libra.svg/20px-Libra.svg.png" width="20" height="17" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Libra.svg/30px-Libra.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Libra.svg/40px-Libra.svg.png 2x" data-file-width="281" data-file-height="235"></a></td>
<td><span class="Unicode">♎</span></td>
<td><a href="/wiki/Libra_(astrology)" title="Libra (astrology)">Libra</a></td>
<td>Venus</td>
<td>Venus</td>
</tr>
<tr>
<td><a href="/wiki/File:Scorpio.svg" class="image"><img alt="Scorpio.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Scorpio.svg/20px-Scorpio.svg.png" width="20" height="22" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Scorpio.svg/30px-Scorpio.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Scorpio.svg/40px-Scorpio.svg.png 2x" data-file-width="214" data-file-height="235"></a></td>
<td><span class="Unicode">♏</span></td>
<td><a href="/wiki/Scorpio_(astrology)" title="Scorpio (astrology)">Scorpio</a></td>
<td>Mars</td>
<td>Pluto</td>
</tr>
<tr>
<td><a href="/wiki/File:Sagittarius.svg" class="image"><img alt="Sagittarius.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sagittarius.svg/20px-Sagittarius.svg.png" width="20" height="20" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sagittarius.svg/30px-Sagittarius.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sagittarius.svg/40px-Sagittarius.svg.png 2x" data-file-width="235" data-file-height="235"></a></td>
<td><span class="Unicode">♐</span></td>
<td><a href="/wiki/Sagittarius_(astrology)" title="Sagittarius (astrology)">Sagittarius</a></td>
<td>Jupiter</td>
<td>Jupiter</td>
</tr>
<tr>
<td><a href="/wiki/File:Capricorn.svg" class="image"><img alt="Capricorn.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/76/Capricorn.svg/20px-Capricorn.svg.png" width="20" height="19" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/7/76/Capricorn.svg/30px-Capricorn.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/7/76/Capricorn.svg/40px-Capricorn.svg.png 2x" data-file-width="246" data-file-height="235"></a></td>
<td><span class="Unicode">♑</span></td>
<td><a href="/wiki/Capricorn_(astrology)" title="Capricorn (astrology)">Capricorn</a></td>
<td>Saturn</td>
<td>Saturn</td>
</tr>
<tr>
<td><a href="/wiki/File:Aquarius.svg" class="image"><img alt="Aquarius.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/24/Aquarius.svg/20px-Aquarius.svg.png" width="20" height="13" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/2/24/Aquarius.svg/30px-Aquarius.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/2/24/Aquarius.svg/40px-Aquarius.svg.png 2x" data-file-width="350" data-file-height="235"></a></td>
<td><span class="Unicode">♒</span></td>
<td><a href="/wiki/Aquarius_(astrology)" title="Aquarius (astrology)">Aquarius</a></td>
<td>Saturn</td>
<td>Uranus</td>
</tr>
<tr>
<td><a href="/wiki/File:Pisces.svg" class="image"><img alt="Pisces.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pisces.svg/20px-Pisces.svg.png" width="20" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pisces.svg/30px-Pisces.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pisces.svg/40px-Pisces.svg.png 2x" data-file-width="189" data-file-height="235"></a></td>
<td><span class="Unicode">♓</span></td>
<td><a href="/wiki/Pisces_(astrology)" title="Pisces (astrology)">Pisces</a></td>
<td>Jupiter</td>
<td>Neptune</td>
</tr>
</tbody></table>

		</div>

		<div class="hide tab-index planets">
<table class="wikitable" style="text-align:center">
<thead><tr>
<th>Name</th>
<th>Symbol</th>
<th>Symbol represents</th>
<th>Meaning of symbol</th>
</tr></thead>
<tbody>
<tr>
<td><a href="/wiki/Sun" title="Sun">Sun</a></td>
<td><a href="/wiki/File:Sun_symbol.svg" class="image" title="Sol"><img alt="Sol" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sun_symbol.svg/25px-Sun_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sun_symbol.svg/38px-Sun_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sun_symbol.svg/50px-Sun_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td><a href="/wiki/Solar_symbol" title="Solar symbol">Solar symbol</a> (<a href="/wiki/Circled_dot" title="Circled dot">circled dot</a>)</td>
<td>Divine spirit (circle) surrounding seed of potential</td>
</tr>
<tr>
<td><a href="/wiki/Moon" title="Moon">Moon</a></td>
<td><a href="/wiki/File:Moon_symbol_crescent.svg" class="image" title="First quarter moon"><img alt="First quarter moon" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Moon_symbol_crescent.svg/25px-Moon_symbol_crescent.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Moon_symbol_crescent.svg/38px-Moon_symbol_crescent.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Moon_symbol_crescent.svg/50px-Moon_symbol_crescent.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>A crescent moon</td>
<td>Mind or evolving human spirit through receptivity (crescent)</td>
</tr>
<tr>
<td><a href="/wiki/Mercury_(planet)" title="Mercury (planet)">Mercury</a></td>
<td><a href="/wiki/File:Mercury_symbol.svg" class="image" title="Mercury"><img alt="Mercury" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mercury_symbol.svg/25px-Mercury_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mercury_symbol.svg/38px-Mercury_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mercury_symbol.svg/50px-Mercury_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td><a href="/wiki/Mercury_(mythology)" title="Mercury (mythology)">Mercury</a>'s winged helmet and <a href="/wiki/Caduceus" title="Caduceus">caduceus</a></td>
<td>Mind (crescent) poised over divine spirit (circle) and matter (cross)</td>
</tr>
<tr>
<td><a href="/wiki/Venus" title="Venus">Venus</a></td>
<td><a href="/wiki/File:Venus_symbol.svg" class="image" title="Venus"><img alt="Venus" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/66/Venus_symbol.svg/25px-Venus_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/6/66/Venus_symbol.svg/38px-Venus_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/66/Venus_symbol.svg/50px-Venus_symbol.svg.png 2x" data-file-width="75" data-file-height="75"></a></td>
<td><a href="/wiki/Venus_(god)" title="Venus (god)" class="mw-redirect">Venus</a>'s hand mirror.</td>
<td>Divine spirit (circle) over matter (cross)</td>
</tr>
<tr>
<td><a href="/wiki/Earth" title="Earth">Earth</a></td>
<td><a href="/wiki/File:Earth_symbol.svg" class="image" title="Earth"><img alt="Earth" src="//upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Earth_symbol.svg/25px-Earth_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Earth_symbol.svg/38px-Earth_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Earth_symbol.svg/50px-Earth_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>Earth; a Solar symbol (<a href="/wiki/Sun_cross" title="Sun cross">sun cross</a>)</td>
<td>Planet Earth — the <a href="/wiki/Cardinal_directions" title="Cardinal directions" class="mw-redirect">cardinal directions</a>. C.f. <a href="/wiki/Globus_cruciger" title="Globus cruciger">Globus cruciger</a></td>
</tr>
<tr>
<td><a href="/wiki/Mars" title="Mars">Mars</a></td>
<td><a href="/wiki/File:Mars_symbol.svg" class="image" title="Mars"><img alt="Mars" src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mars_symbol.svg/25px-Mars_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mars_symbol.svg/38px-Mars_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mars_symbol.svg/50px-Mars_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td><a href="/wiki/Mars_(god)" title="Mars (god)" class="mw-redirect">Mars</a>'s shield and spear.</td>
<td>Drive (arrow) over divine spirit (circle)</td>
</tr>
<tr>
<td><a href="/wiki/Ceres_(dwarf_planet)" title="Ceres (dwarf planet)">Ceres</a></td>
<td><a href="/wiki/File:Ceres_symbol.svg" class="image" title="Ceres"><img alt="Ceres" src="//upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ceres_symbol.svg/25px-Ceres_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ceres_symbol.svg/38px-Ceres_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ceres_symbol.svg/50px-Ceres_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>Scythe (handle down), emblematic of <a href="/wiki/Ceres_(Roman_mythology)" title="Ceres (Roman mythology)" class="mw-redirect">Ceres</a> as goddess of the Harvest.</td>
<td>A stylized sickle, a crescent of receptivity resting on a cross of matter.</td>
</tr>
<tr>
<td><a href="/wiki/Jupiter" title="Jupiter">Jupiter</a></td>
<td><a href="/wiki/File:Jupiter_symbol.svg" class="image" title="Jupiter"><img alt="Jupiter" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/26/Jupiter_symbol.svg/25px-Jupiter_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/2/26/Jupiter_symbol.svg/38px-Jupiter_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/2/26/Jupiter_symbol.svg/50px-Jupiter_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td><a href="/wiki/Jupiter_(god)" title="Jupiter (god)" class="mw-redirect">Jupiter</a>'s thunderbolt or eagle</td>
<td>Mind (crescent) rising above the horizon of matter (cross)</td>
</tr>
<tr>
<td><a href="/wiki/Saturn" title="Saturn">Saturn</a></td>
<td><a href="/wiki/File:Saturn_symbol.svg" class="image" title="Saturn"><img alt="Saturn" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saturn_symbol.svg/25px-Saturn_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saturn_symbol.svg/38px-Saturn_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saturn_symbol.svg/50px-Saturn_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td><a href="/wiki/Cronus" title="Cronus">Saturn</a>'s sickle</td>
<td>Matter (cross) taking precedence over mind or human spirit (crescent)</td>
</tr>
<tr>
<td rowspan="2"><a href="/wiki/Uranus" title="Uranus">Uranus</a></td>
<td><a href="/wiki/File:Uranus%27s_astrological_symbol.svg" class="image" title="Uranus"><img alt="Uranus" src="//upload.wikimedia.org/wikipedia/commons/thumb/9/94/Uranus%27s_astrological_symbol.svg/25px-Uranus%27s_astrological_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/9/94/Uranus%27s_astrological_symbol.svg/38px-Uranus%27s_astrological_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/9/94/Uranus%27s_astrological_symbol.svg/50px-Uranus%27s_astrological_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>H in symbol taken from discoverer's last name, <a href="/wiki/Sir_William_Herschel" title="Sir William Herschel" class="mw-redirect">Herschel</a></td>
<td>The circle of spirit and a dominant cross of matter, in form of an antenna that uses matter as a way to insight.</td>
</tr>
<tr>
<td><a href="/wiki/File:Uranus_symbol.svg" class="image" title="Uranus"><img alt="Uranus" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Uranus_symbol.svg/25px-Uranus_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Uranus_symbol.svg/38px-Uranus_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Uranus_symbol.svg/50px-Uranus_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>Derived from a combination of the Mars and Sun symbols</td>
<td>Astronomical glyph often used astrologically. Drive over a divine spirit (circle) surrounding seed of potential</td>
</tr>
<tr>
<td><a href="/wiki/Neptune" title="Neptune">Neptune</a></td>
<td><a href="/wiki/File:Neptune_symbol.svg" class="image" title="Neptune"><img alt="Neptune" src="//upload.wikimedia.org/wikipedia/commons/thumb/4/47/Neptune_symbol.svg/25px-Neptune_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/4/47/Neptune_symbol.svg/38px-Neptune_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/4/47/Neptune_symbol.svg/50px-Neptune_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td><a href="/wiki/Neptune_(god)" title="Neptune (god)" class="mw-redirect">Neptune's</a> trident</td>
<td>Mind or receptivity (crescent) transcending matter (cross)</td>
</tr>
<tr>
<td rowspan="2"><a href="/wiki/Pluto" title="Pluto">Pluto</a></td>
<td><a href="/wiki/File:Pluto%27s_astrological_symbol.svg" class="image" title="Pluto (alternate)"><img alt="Pluto (alternate)" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pluto%27s_astrological_symbol.svg/25px-Pluto%27s_astrological_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pluto%27s_astrological_symbol.svg/38px-Pluto%27s_astrological_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pluto%27s_astrological_symbol.svg/50px-Pluto%27s_astrological_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>Modification of Neptune's astrological symbol</td>
<td>Mind (crescent) transcending matter (cross) to reach for divine spirit (circle)</td>
</tr>
<tr>
<td><a href="/wiki/File:Pluto_symbol.svg" class="image" title="Pluto"><img alt="Pluto" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pluto_symbol.svg/25px-Pluto_symbol.svg.png" width="25" height="25" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pluto_symbol.svg/38px-Pluto_symbol.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pluto_symbol.svg/50px-Pluto_symbol.svg.png 2x" data-file-width="50" data-file-height="50"></a></td>
<td>PL monogram for <b>Pl</b>uto and <a href="/wiki/Percival_Lowell" title="Percival Lowell">Percival Lowell</a></td>
<td>Astronomical symbol often used astrologically</td>
</tr>
</tbody></table>

		</div>
	</div>

</div>
