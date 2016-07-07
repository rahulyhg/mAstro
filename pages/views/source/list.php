<div class="friend-list">
	<h3 class="bor">Source list</h3>
<? $sAr = $getRecord -> GET('source');
foreach ($sAr as $sO) {
	$sAu = getUserInfo($sO['uid']) ?>
	<div class="friend-one">
		<span class="source-icon source-<? echo $sO['type'] ?>"></span>
		<a class="friend-avt left" href="<? echo $sLink.'/'.$sO['link'] ?>">
			<div class="friend-avt-div">
				<img class="friend-avt-img img-rounded" src="<? echo $sO['avatar'] ?>"/>
			</div>
		</a>
		<a class="friend-name left" href="<? echo $sLink.'/'.$sO['link'] ?>"><? echo $sO['title'] ?></a>
		<div class="clearfix"></div>
		<div class="friend-des">
			<? echo $sO['des'] ?>
		</div>
		<div class="friend-url">
			<? if ($sO['type'] == 'website') echo '<span class="fa fa-home"></span> ';
			else echo '<span class="fa fa-book"></span>' ?>
			<a href="<? echo $sO['url'] ?>"><? echo $sO['url'] ?></a>
		</div>
	</div>
<? } ?>
	<div class="clearfix"></div>
</div>

<form class="bootstrap-validator-form margin-top" action="?do=add">
	<h3 class="bor">Add a source</h3>
	<div class="form-group">
		<div class="col-lg-4 control-label">Title</div>
		<div class="col-lg-8">
			<input type="text" name="title" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Homepage</div>
		<div class="col-lg-8">
			<input type="text" name="url" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Avatar/Logo</div>
		<div class="col-lg-8">
			<input type="text" name="logo" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Description</div>
		<div class="col-lg-8">
			<textarea name="des" class="form-control"></textarea>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="add-form-submit center">
		<input type="reset" value="Reset"/>
		<input type="submit" value="Submit"/>
	</div>
</form>
