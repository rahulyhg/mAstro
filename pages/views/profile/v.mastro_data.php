<? if ($m) {
	$aIn = getRecord('astro_data', "`uid` = '{$u}' AND `n` = '{$m}' ");
	if ($aIn['id']) $_DATA = $aIn;
}
if (($m && $aIn['id']) || !$m) { ?>
<form class="chart-inputs col-lg-9" action="?mode=mastro_data<? if ($m) echo '&m='.$m ?>&do=save" method="post" name="save">
	<? include 'pages/views/form.php' ?>
	<div class="add-form-submit center">
		<input type="reset" value="Reset"/>
		<input type="submit" value="Save"/>
	</div>
</form>
<? } else echo '<div class="alerts alert-error">No data found.</div>' ?>

<div class="mastro-data-list col-lg-3">
	<ol>
<? $dList = $getRecord -> GET('astro_data', "`uid` = '{$u}' ");
foreach ($dList as $dO) { ?>
	<li class="mastro-data-one">
		<div class="mastro-data-title">
			<a href="<? echo $prLink.'?mode=mastro_data&m='.$dO['n'] ?>"><? echo $dO['name'] ?></a>
		</div>
	</li>
<? } ?>
	</ol>
</div>
<? $externalJs[] = JS.'/profile.js' ?>
