<div class="popup-main">
	<div class="popup-section section-light blog-p-info padding">
		<div class="mix-v-title bold"><a href="<? echo $bLink.'/'.$bIn['link'] ?>.html"><? echo $bIn['title'] ?></a></div>
		<div class="clearfix"></div>
		<div class="blog-p-content">
			<? echo $bIn['content'] ?>
		</div>
	</div>
</div>
<div class="popup-right">
	<div class="popup-section section-light up-des">
		<div class="form-group">
			<input class="form-input" name="album-title" placeholder="Album title"/>
		</div>
		<textarea name="album-des" style="min-height:120px" class="stt-textarea non-sce form-input"></textarea>
		<div class="stt-bottom">
			<div class="left stt-location"><span class="fa fa-map-marker" title="Where do you take these photos"></span></div>
			<div class="left stt-date"><span class="fa fa-calendar" title="When do you take these photos"></span></div>
			<div class="clearfix"></div>
		</div>
		<div class="add-form-submit center">
			<input type="reset" role="close" value="Close"/>
			<input type="submit" value="Submit"/>
		</div>
	</div>
</div>

<div class="clearfix"></div>
