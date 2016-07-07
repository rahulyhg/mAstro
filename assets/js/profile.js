function check(input) {
	if ($(input).is(':checked')) $(input).closest('div').find('select.hour, input.min').attr('disabled', true);
	else $(input).closest('div').find('select.hour, input.min').attr('disabled', false);
}
$(function () {
	$('.chart-inputs').submit(function () {
		$.ajax({
			url: $(this).attr('action'),
			type: 'post',
			data: $(this).serialize(),
			success: function (data) {
				if (data == 0) {
					mtip('', 'success', '', 'Data updated successfully! Reloading...');
					location.reload();
				} else $('.chart-inputs').prepend('<div class="alerts alert-error">'+data+'</div>')
			}
		});
		return false
	});
	$('.unknown-hr input').each(function () {
		check(this);
		$(this).on('toggle', function () {
			check(this)
		})
	});
})
