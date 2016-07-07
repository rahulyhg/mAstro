<? if ($do == 'add') {
	$title = _content($_POST['title']);
	$link = trendCode($title);
	$des = _content($_POST['des']);
	$url = _content($_POST['url']);
	$avt = $_POST['logo'];
	if ($title && $des && $url) {
		$get = getRecord('source', "`title` = '{$title}' OR `url` = '{$url}' ");
		if (!$get['id']) {
			$ins = insert('source', "`title`, `url`, `avatar`, `des`, `link`, `time` ", " '{$title}', '{$url}', '{$avt}', '{$des}', '{$link}', '{$current}' ");
			if ($ins) echo '[type]success[/type][content]Source added successfully![/content]';
			else echo $Er[000];
		} else echo $Er[002];
	} else echo $Er[001];
} ?>
