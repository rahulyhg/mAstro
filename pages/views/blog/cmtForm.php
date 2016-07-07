<? if ($u) { ?>
<form class="bootstrap-validator-form" action="?do=cmt" id="addcmt">
	<div class="arrow-div">
		<div class="form-group">
			<div class="col-lg-3 control-label no-padding">Comment</div>
			<div class="col-lg-9">
				<textarea name="contents" class="form-input" style="height:120px"></textarea>
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
