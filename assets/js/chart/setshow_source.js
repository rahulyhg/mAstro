var url = window.location.href.split('#')[0];
function filter (type) {
	params = '';
	params += '&sort='+$('.data-filter-options > div select#sort').val();
	params += '&order='+$('.data-filter-options > div select#order').val();
	rid = $('.data-filter-options').attr('data-rid');
	$('.data-list').html('<div class="spinner loading-sending"><div></div><div></div><div></div></div>');
	$('.data-list').load(url+'?do=setshow&show=source'+params+' .data-list > div')
}

$(function () {
	$('.data-filter-options > div select').on('change', function () {
		filter($(this).attr('id'));
	});
	$('.friend-one').click(function () {
		sid = $(this).attr('id');
		$.ajax({
			url: url+'?do=setshow&show=source&source='+sid,
			type: 'post',
			success: function (data) {
				if (data == 0) {
					mtip('', 'success', '', 'Switch display option successfully!');
					remove_popup();
					location.reload()
				} else if (data == 1) mtip('', 'error', '', 'Oops! Something went wrong.');
				else mtip('', 'error', '', data)
			}
		})
	})
});
