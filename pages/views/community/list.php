<div class="community">

<div class="col-lg-8 main-col">
	<? include 'form.php' ?>

<? $sList = $getRecord -> GET('activity');
foreach ($sList as $sO) {
	include 'l.Top.php';
	if (file_exists('pages/views/'.$page.'/l.'.$sType.'.php')) { ?>
	<div class="one-post type-<? echo $sType ?>">
		<? include 'l.'.$sType.'.php' ?>
	</div>
<? }
} ?>

</div>

<div class="clearfix"></div>
</div>
<? $externalJs[] = JS.'/community/list.js'; ?>
