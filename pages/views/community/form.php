<div class="stt-form one-post type-mystery">
	<div class="post-note">
		<a href="<? echo $member['link'] ?>"><? echo $member['name'] ?></a> <span class="stt-action">added a
			<li class="dropdown">
				<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">status</a>
				<ul class="dropdown-menu with-triangle pull-right">
					<li class="stt-button" id="status"><a>status</a></li>
					<li class="stt-button" id="album"><a>album</a></li>
					<li class="stt-button" id="mix"><a>mix</a></li>
					<li class="stt-button" id="collection"><a>collection</a></li>
				</ul>
			</li>
		</span></a>
	</div>
	<div class="post-icons">
		<div class="post-time updated" title="<? echo date('d.m.Y H:i', $time) ?>">
			<span class="day"><? echo date('d', $time) ?></span>
			<span class="month"><? echo date('M', $time) ?></span>
		</div>
		<span class="icon-format"></span>
		<div class="clearfix"></div>
		<div class="post-author left">
			<a data-online="1" href="<? echo $member['link'] ?>"><img src="<? echo $member['avatar'] ?>" title="<? echo $member['name'] ?>" class="thumb img-rounded post-author-avt"/></a>
		</div>
	</div>
	<div class="post-info">
		<textarea style="min-height:120px" class="stt-textarea non-sce form-input"></textarea>
		<div class="stt-bottom">
			<div class="left add-photos"><span class="fa fa-camera" title="Add photos to your post"></span></div>
			<div class="left tag-people"><span class="fa fa-user" title="Tag people in your post"></span></div>
<!--			<div class="right auto-cloth-tagging for-photo">Auto outfits detecting: <span class="mode mode-on">On</span></div> -->
			<div class="clearfix"></div>
		</div>
	</div>
</div>
