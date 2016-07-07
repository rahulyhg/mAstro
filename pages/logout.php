<? 	include MAIN_PATH.'/header.php';

if (!$u) echo '<div class="alerts alert-warning">You are not logged in.</div>';
else {
$act = get('act');
$memFb = 0 ?>

<div class="goodbye">We'll miss you!</div>

<? if ($member['oauth_provider'] == 'facebook') {
	$memFb = 1;
/* ?>
<script>
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		alert('dis');
		logout(response.authResponse.accessToken);
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
		'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' +
		'into Facebook.';
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		FB.api("/me/permissions", "delete", function (response) {
			alert(response);
//			window.location.href = MAIN_URL+'/logout?act=logout';
		})
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId		: '<? echo $social_conf['Facebook']['id'] ?>',
		cookie	 : true,// enable cookies to allow the server to access 
									// the session
		xfbml		: true,// parse social plugins on this page
		version	: 'v2.2' // use version 2.2
	});
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logout (token) {
	FB.logout(function(response) {
		alert(response.id);
		window.location.href = MAIN_URL+'/logout?act=logout';
	});
}
</script>
<? */
} ?>

<? //if ($memFb == 0 || $act == 'logout') {
	$useR = $member['id'];
	changeValue('members', "`id` = '{$u}' ", "`lastlog_time` = '{$current}', `online` = '0' ");
	session_destroy();
	echo '<script>window.history.back()</script>';
//}
} ?>
