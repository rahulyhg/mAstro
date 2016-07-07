<!--<div class="popup-main">
	<div class="popup-section section-light padding">
	</div>
</div>
<div class="popup-right">
	<div class="popup-section section-light padding">
	</div>
</div>
<div class="clearfix"></div>-->
<div class="popup-full">
	<div class="popup-section section-light padding margin-top">
<? if ($u) {
	if ($bPi) $bIn = $bPi ?>
<form class="bootstrap-validator-form" action="?v=edit&do=edit" id="addblogchild">
	<div class="arrow-div">
		<div class="form-group">
			<div class="col-lg-3 control-label no-padding">Title *</div>
			<div class="col-lg-9">
				<input name="title" class="form-control" value="<? echo $bIn['title'] ?>"/>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="form-group">
			<div class="col-lg-3 control-label no-padding">Thumbnai <i>(Optional)</i></div>
			<div class="col-lg-9">
				<input name="thumb" class="form-control" value="<? echo $bIn['thumb'] ?>"/>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="form-group">
			<div class="col-lg-3 control-label no-padding">Content *</div>
			<div class="col-lg-9">
				<textarea name="contents" class="form-input" style="height:120px"><? echo $bIn['content'] ?></textarea>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="add-form-submit center">
			<input type="reset" value="Reset"/>
			<input type="submit" value="Submit"/>
		</div>
		<div class="clearfix"></div>
	</div>
</form>
<? } else echo '<div class="alerts alert-warning">Please <a href="'.MAIN_URL.'/login">login</a> to leave comments.</div>' ?>
	</div>
</div>
