function filter (type) {
//	filter = ["ot", "sort"];
	params = '';
	params += '&ot='+$('.data-filter-options > div select#ot').val();
	params += '&sort='+$('.data-filter-options > div select#sort').val();
	params += '&order='+$('.data-filter-options > div select#order').val();
/*	$.each(filter, function (i, v) {
		params += '&'+v+'='+$('.data-filter-options > div select#'+v).val();
	});
*/	rid = $('.data-filter-options').attr('data-rid');
	$('.data-list').html('<div class="spinner loading-sending"><div></div><div></div><div></div></div>');
	$('.data-list').load(MAIN_URL+'/report/'+rid+'?v=window&type=related'+params+' .data-list > div')
}

$(function () {
	$('.data-filter-options > div select').on('change', function () {
		filter($(this).attr('id'));
	})
});
