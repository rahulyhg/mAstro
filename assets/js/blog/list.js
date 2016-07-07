$(function () {
	$('.one-post').not('.stt-form').each(function () {
		type = $(this).attr('class').split('type-')[1];
		img = $(this).closest('.one-post').find('.post-thumb-img-inner img').attr('src');
		$(this).find('.post-thumb-view-photo').click(function () {
			href = $(this).attr('data-href');
			$('.the-board').load(href + '?v=window', function () {
				popup('', img, href)
			})
		})
	})
})
