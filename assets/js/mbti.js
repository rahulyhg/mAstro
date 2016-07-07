$(function () {
	$('#mbti-form').submit(function () {
		var full = $(this).attr('data-full');
		var error = false;
/*		if ($("#mbti-sex option:selected").length) {
			$("#mbti-sex").focus();
			mtip('', 'error', '', "Bạn chưa chọn giới tính");
			return false
			error = true;
		}
*/		if (full == 1) {
		var n = "",
			r = "",
			i = "",
			s = "",
			o = "",
			u = "";
		for (var a = 1; a < 51; a++) {
			r = "mbti" + a;
			i = document.getElementsByName(r);
			o = i.length;
			n = "";
			for (s = 0; s < o; ++s) {
				if (i[s].checked) n = i[s].value
			}
			if (n == "") {
				if (a > 1) u = a - 1;
				else u = a;
				u = "mbti" + u + "2";
				document.getElementById(u).focus();
				mtip('', 'error', '', "Bạn chưa chọn câu trả lời thứ " + a);
				error = true
			}
		}
		}
		if (error == false) {
			$.ajax({
				url: window.location.href+'?do=done',
				type: 'post',
				data: $('#mbti-form').serialize(),
				success: function (data) {
					if (data) {
						mtip('', 'success', '', 'Caculating successfully! Redirecting...');
						redirect(data);
					} else mtip('', 'error', '', 'Oops! Something went wrong.');
				}
			})
		}
		return false
	})
});
