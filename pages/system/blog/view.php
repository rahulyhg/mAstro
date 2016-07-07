<? if ($do == 'cmt') {
	$cont = _content($_POST['contents']);
	if ($cont) {
		$ins = insert('blog_cmts', "`uid`, `iid`, `content`, `time`", " '{$u}', '{$iid}', '{$cont}', '{$current}' ");
		activityAdd('blog_cmts', $iid);
		if ($ins) echo '[type]success[/type] [content]Success![/content]';
		else echo $Er[000];
	} else echo $Er[001];
}
if ($do == 'add') {
	$title = _content($_POST['title']);
	$link = trendCode($title);
	$thumb = _content($_POST['thumb']);
	if (!$thumb) $thumb = $bIn['thumb'];
	$cont = _content($_POST['contents']);
	if ($cont) {
		$ins = insert('blog', "`uid`, `bid`, `title`, `link`, `thumb`, `content`, `time`", " '{$u}', '{$iid}', '{$title}', '{$link}', '{$thumb}', '{$cont}', '{$current}' ");
		activityAdd('blog-child', $iid);
		if ($ins) echo '[type]success[/type] [content]Success![/content]';
		else echo $Er[000];
	} else echo $Er[001];
}
if ($do == 'edit') {
	$title = _content($_POST['title']);
	$link = trendCode($title);
	$thumb = _content($_POST['thumb']);
	if (!$thumb) $thumb = $bIn['thumb'];
	$cont = _content($_POST['contents']);
	if ($cont) {
		if ($bPi) $bIn = $bPi;
		$ins = changeValue('blog', "`id` = '{$bIn['id']}' ", "`content` = '{$cont}', `thumb` = '{$thumb}', `title` = '{$title}', `link` = '{$link}', `last_updated` = '{$current}' ");
		activityAdd('blog-child-update', $bIn['id']);
		if ($ins) echo '[type]success[/type] [content]Success![/content]';
		else echo $Er[000];
	} else echo $Er[001];
}
