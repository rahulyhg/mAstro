var uname = 'guest';
jQuery(document).ready(function ($) {
	var id = 1;
	$('#terminal').terminal(function (command, term) {
		if (command == 'help') {
			term.echo("available commands are chart, relationship, transit, help, developer");
		} else if (command == 'login') {
			term.echo('Username');
			term.push(function (command, term) {
				if (command == 'ping') {
					term.echo('pong');
				} else {
					term.echo('unknown command ' + command);
				}
			}, {
				prompt: uname+':login$ ',
				name: 'test'
			});
		} else if (command == 'chart') {
			term.push(function (command, term) {
				if (command == 'help') {
					term.echo('if you type ping it will display pong');
				} else if (command == 'ping') {
					term.echo('pong');
				} else {
					term.echo('unknown command ' + command);
				}
			}, {
				prompt: uname+':chart$ ',
				name: 'test'
			});
		} else if (command == "js") {
			term.push(function(command, term) {
				var result = window.eval(command);
				if (result != undefined) {
					term.echo(String(result));
				}
			}, {
				name: 'js',
				prompt: 'js> '
			});
		} else {
			term.echo("unknow command " + command);
		}
	}, {
		greetings: "This is an mAstro terminal tool. Type help for instructions.",
		prompt: uname+':~$ ',
		onBlur: function () {
			return false
		}
	});
});
