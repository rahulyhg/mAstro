<? $uname = $_POST['username'];
$pass = $_POST['password'];
$token = $_POST['token'];
$id = $_POST['id'];
$type = $_POST['type'];
$name = $_POST['name'];
$fName = $_POST['fName'];
$lName = $_POST['lName'];
$avatar = urldecode($_POST['avatar']);
$friends = json_decode($_POST['friends'], true);

$ok = false;

if ($type == 'facebook') {
	$uname = str_replace('-', '', trendCode($name));
	$member = getRecord('members', "`oauth_provider` = 'facebook' AND `oauth_uid` = '{$id}' ");
} else if ($uname && $pass) $member = getRecord('members', "`username` = '{$uname}' ");
else echo $Er[001];

if ($member['id']) $ok = true;
else if ($type == 'facebook') {
	$ins = insert('members', "`username`, `oauth_uid`, `oauth_provider`, `token`, `last_name`, `first_name`, `avatar`, `time`", " '{$uname}', '{$id}', 'facebook', '{$token}', '{$fName}', '{$lName}', '{$avatar}', '{$current}' ");
	if ($ins) {
		$member = getRecord('members', "`oauth_provider` = 'facebook' AND `oauth_uid` = '{$id}' ");
		$ok = true;
	} else echo $Er[000];
} else echo '[type]error[/type][content]Username or password mismatched![/content]';

if ($ok == true) {
	$u = $_SESSION['user_id'] = $member['id'];
	changeValue('members', "`id` = '{$u}' ", "`online` = '1' ");
	$memberFriendsAr = explode(',', $member['friends']);
	if ($type == 'facebook') {
		changeValue('members', "`id` = '{$u}' ", "`avatar` = '{$avatar}' ");
		foreach ($friends as $fO) {
			$fIn = getRecord('members^id', "`oauth_provider` = 'facebook' AND oauth_uid` = '{$fO['id']}' ");
			if ($fIn['id'] && !in_array($u, $memberFriendsAr)) {
				pushToCol('members', 'id', $u, 'friends', $fIn['id']);
				pushToCol('members', 'id', $fIn['id'], 'friends', $u);
			}
		}
	}
	echo '[type]success[/type][content]Logged in successfully. Redirecting...[/content]';
}
