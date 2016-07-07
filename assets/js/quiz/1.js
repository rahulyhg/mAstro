function formlessSubmit () {
	if ($('#input').hasClass('nobutton')) $(document).trigger('rundialog');
	return true
}

var quiz_results = {};
$(function() {
	$('form').append('<input type="hidden" name="quiz_results" value=""/>');
	$('form').append('<input type="hidden" name="quiz_positions" value=""/>');
	$('form').append('<input type="hidden" name="quiz_questions" value="'+$('#quiz .gallery').length+'" />');
});
$(document).ready(function() {
	$('#quiz').on('click','.quiz_answer', function (e) {
		var position = parseInt($(this).data('pos')),
			question = parseInt($(this).data('question')),
			choice = parseInt($(this).data('choice')),
			resultCount = 0;
		$('.answers_'+question).find('div').removeClass('selected').addClass('unpick');
		$(this).removeClass('unpick').toggleClass('selected');
		quiz_results[question] = choice;
		$(':input[name="quiz_results"]').val(JSON.stringify(quiz_results));
		for (var i in quiz_results) resultCount++;
		if ($('#quiz .gallery').length == resultCount) $('.submit-form').show();
	})
});
