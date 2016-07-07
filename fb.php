<? include 'lib/config.php';

require 'lib/facebook-3.2.3/src/facebook.php';

$facebook = new Facebook(array(
	'appId'  => $social_conf['Facebook']['id'],
	'secret' => $social_conf['Facebook']['secret'],
));
$config = array(
	'appId' => $social_conf['Facebook']['id'],
	'secret' => $social_conf['Facebook']['secret'],
	'allowSignedRequest' => false, // optional, but should be set to false for non-canvas apps
);

$facebook = new Facebook($config);

$user_id = $facebook->getUser(); ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="description" content="Push me">
		<meta name="keywords" content="pushme,pushthecampaign,campaign,push me,push the campaign">
		<meta name="author" content="Miamor West">
		<title>Push me</title>
		<link rel="shortcut icon" type="image/x-icon" href="<? echo IMG ?>/discussion.ico"/>
		<link rel="stylesheet" href="<? echo CSS ?>/style.min.css"/>
		<link rel="stylesheet" href="<? echo PLUGINS ?>/font-awesome/css/font-awesome.min.css">
 		<link rel="stylesheet" href="<? echo CSS ?>/main.css"/>
<? 		echo '<script>var MAIN_URL = "'.MAIN_URL.'", gURL = "'.MAIN_URL.'/box", pURL = "'.MAIN_URL.'/promise", cURL = "'.MAIN_URL.'/campaign", fURL = "'.MAIN_URL.'/feed", uURL = "'.MAIN_URL.'/user"</script>'; ?>
	</head>
 
	<body class="tooltips">

<? //if ($u) {
      // We have a user ID, so probably a logged in user.
      // If not, we'll get an exception, which we handle below.
	try {
		$_SESSION['fb_token'] = $facebook->getAccessToken();
		$user_profile = $facebook->api('/me', 'GET');
/*		$frFb = $user_profile["friends"];
		foreach ($frFb["data"] as $friend) {
			pushToCol('members', 'id', $u, 'following', $friend['id']);
			pushToCol('members', 'id', $friend['id'], 'following', $u);
		} 
		print_r($user_profile); */
		$userAvatar = 'https://graph.facebook.com/'.$user_profile['id'].'/picture?width=150&height=150';
		$tokenID = $_SESSION['fb_token'];
		$tusn = trendCode($user_profile['name']);
//		$tusn = $user_profile['username'];
		if (countRecord('members', "`username` = '{$tusn}' ") > 0) {
			$tusn .= '.'.generateRandomString(3);
			while (countRecord('members', "`username` = '{$tusn}' ") > 0) $tusn .= '.'.generateRandomString(3);;
		}

		copy('https://graph.facebook.com/'.$user_profile['id'].'/picture', "data/avatar/{$user_profile['id']}.jpg");

		if ($userAvatar) $avatar = MAIN_URL."/data/avatar/{$user_profile['id']}.jpg";
		else $avatar = MAIN_URL.'/data/avatar/gallery/1.jpg';
		$checkLogin = false;
		if (countRecord('members', "`oauth_uid` = '{$user_profile['id']}'  ") <= 0) {
			$add = insert('members', "`username`, `avatar`, `gender`, `name`, `email`, `oauth_uid`, `oauth_provider`, `token`, `time`", " '{$tusn}', '{$avatar}', '{$gender}', '{$user_profile['name']}', '{$user_profile['email']}', '{$user_profile['id']}', 'facebook', '{$tokenID}', '{$curint}' ");
			if ($add) $checkLogin = true;
		} else {
			$change = changeValue('members', "`oauth_uid` = '{$user_profile['id']}' ", "`token` = '{$tokenID}', `oauth_uid` = '{$user_profile['id']}', `oauth_provider` = 'facebook', `avatar` = '{$avatar}', `name` = '{$user_profile['name']}' ");
			if ($change) $checkLogin = true;
		}
		if ($checkLogin == true) {
			$member = getRecord('members', "`oauth_uid` = '{$user_profile['id']}' ");
//			$member = mysql_query("SELECT * FROM `members` WHERE `email` = '{$user_profile['email']}' AND `oauth_uid` = '{$user_profile['id']}' AND `oauth_provider` = 'facebook' AND `token` = '{$tokenID}' ");
			$_SESSION['user_id'] = $member['id'];
			$_SESSION['user_admin'] = $member['admin'];
			$likesFb = $facebook->api('/me/likes', 'GET');
			$likesFbAr = $likesFb["data"];
			foreach ($likesFbAr as $lfb) {
				$pid = $lfb['id'];
				$pLocation = implode('|', $lfb['location']);
				if ($lfb['category'] == 'Non-profit Organisation') {
					if (countRecord('fb_pages', "`pid` = '{$pid}'  ") <= 0) {
						$mmz = insert('fb_pages', "`pid`, `username`, `cover`, `name`, `link`, `uid`, `location`, `likes`, `description`, `about`, `time`", " '{$pid}', '{$lfb['username']}', '{$lfb['cover']['source']}', '{$lfb['name']}', '{$lfb['link']}', '{$u}', '{$pLocation}', '{$lfb['likes']}', '{$lfb['description']}', '{$lfb['about']}', '{$curint}' ");
						$nnz = insert('campaigns', "`type`, `title`, `link`, `avatar`, `cover`, `fb`, `fid`, `ufetch`, `des`, `details`, `time`", " 'full', '{$pid}', '{$lfb['name']}', '{$lfb['username']}', '{$lfb['cover']['source']}', '{$lfb['cover']['source']}', '{$pid}', '{$pid}', '{$u}', '{$lfb['description']}', '{$lfb['about']}', '{$curint}' ");
					} else {
						$mmz = changeValue('fb_pages', "`pid` = '{$pid}' ", "`name` = '{$lfb['name']}', `description` = '{$lfb['description']}', `about` = '{$lfb['about']}', `cover` = '{$lfb['cover']['source']}' ");
						$nnz = changeValue('campaigns', "`fb` = '{$pid}' ", "`title` = '{$lfb['name']}', `des` = '{$lfb['about']}', `details` = '{$lfb['description']}', `avatar` = '{$lfb['cover']['source']}', `cover` = '{$lfb['cover']['source']}' ");
					}
				}
			}
//			echo $_SESSION['user_id'].'~~~~~~~~~~~'.$member['id'].'~~~~~' . "`email` = '{$user_profile['email']}' AND `oauth_uid` = '{$user_profile['id']}' AND `oauth_provider` = 'facebook' AND `token` = '{$tokenID}' ";
		} ?>
<script language="javascript">
	if (window.opener) {
		try { window.opener.parent.$.colorbox.close(); } catch(err) {} 
//		window.opener.parent.location.href = MAIN_URL + '/edit';
		window.opener.parent.history.back()
	}
	window.self.close();
</script>
<? 	} catch(FacebookApiException $e) {
		// If the user is logged out, you can have a 
		// user ID even though the access token is invalid.
		// In this case, we'll get an exception, so we'll
		// just ask the user to login again here.
/*		$login_url = $facebook->getLoginUrl(array(
			'scope' => 'email, user_friends, public_profile, publish_actions, publish_stream, user_likes'
		));
*/		$login_url = $facebook->getLoginUrl();
		echo 'Please <a href="' . $login_url . '">login.</a>';
		error_log($e->getType());
		error_log($e->getMessage());
	}
/*} else {
	// No user, print a link for the user to login
	$login_url = $facebook->getLoginUrl();
//      echo 'Please <a href="' . $login_url . '">login.</a>'; ?>
<div align="center" class="loading">
	<div class="spinner"> <div></div> <div></div> <div></div> </div>
	<h3>Loading...</h3>
	<b>Facebook</b>. Please wait.
</div>
<script>window.location.href = '<? echo $login_url ?>' </script>
<? }

/*	$login_url = $facebook->getLoginUrl(array(
//		'scope' => 'email, user_friends, public_profile'
		'scope' => 'email, user_friends, public_profile, publish_actions, publish_stream, user_likes'
	)); */
?>


	</body>
</html>
