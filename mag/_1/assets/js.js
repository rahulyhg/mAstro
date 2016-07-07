$(function () {
	$('.wrap-content').each(function () {
		var newContent = '<p>'+$.trim($(this).html().replace(/[\t\n]+/g, '')).split('<br>').join('</p><p>')+'</p>';
		$(this).html(newContent);
		$(this).find('p').each(function () {
			if ($(this).html() == '&nbsp;') $(this).remove();
			if ($(this).html() == '***') $(this).css('text-align', 'center');
		})
	});
});
