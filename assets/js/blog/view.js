function content_ ($this) {
	$this.find('blockquote').after('<br/>').wrapInner('<div class="blockquote"/>');
	var newContent = '<p>'+$this.html().replace('<br/>', '<br>').split('<br>').join('</p><p>')+'</p>';
	$this.html(newContent);
	$this.find('p').each(function () {
		if (!$(this).html().length || $(this).html() == '&nbsp;') $(this).remove();
	})
}

$(window).scroll(function() {
	wi = $('.blog-v-pages').parent().width();
	scroll = $(this).scrollTop();
	pHeight = $('.blog-v-pages').height();
	cHeight = $('.blog-v-content').height();
	lim = cHeight + 400 - pHeight;
	limit = lim + 200;
	$('.blog-v-pages').css('max-height', cHeight);
	if (scroll > 400) {
		$('.blog-v-pages').addClass('fixed').css('width', wi);
//		if (scroll > lim) $('.blog-v-pages').css('top', -(pHeight/2));
//		else $('.blog-v-pages').css('top', 0);
	} else $('.blog-v-pages').removeClass('fixed');
});

$(function () {
	$('#add-child-blog, #edit-child-blog').click(function () {
		act = $(this).attr('id').split('-')[0];
		lnk = $(this).attr('link');
		url = path+'?v='+act;
		if (lnk) url = path+'/'+lnk+'?v='+act;
		$('.the-board').load(url, function () {
			popup();
			validator()
		})
	});
	$('.blog-v-content').each(function () {
		content_($(this));
		$(this).find('span:not([class])').contents().unwrap();
		$(this).find('[dir="ltr"]').removeAttr('style');
/*		$(this).find('div:not([class])').each(function () {
			$div = $(this);
			$.each(this.attributes, function () {
				$div.contents().unwrap().wrap('<p '+this.name+'="'+this.value+'"/>')
			})
		});
		$(this).find('div:not([class])').contents().unwrap().wrap('<p/>')
*/	});
});
