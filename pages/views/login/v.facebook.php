<!--<fb:login-button scope="public_profile,email,user_friends" onclick="checkLoginState();"></fb:login-button> -->
<div class="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="true" data-auto-logout-link="false"></div>
<div id="status"></div>

<script>
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		retrieve(response.authResponse.accessToken);
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
//		document.getElementById('status').innerHTML = 'Please log into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
//		document.getElementById('status').innerHTML = 'Please log into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
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
// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//	your app or not.
//
// These three cases are handled in the callback function.
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.3&appId=<? echo $appId ?>";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Load the SDK asynchronously
/*(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/
// Here we run a very simple test of the Graph API after login is
// successful.See statusChangeCallback() for when this call is made.
function retrieve (token) {
	console.log('Welcome!Fetching your information.... ');
	var data = new Array();
	avt = friends = '';
	FB.api('/me/picture', function (response) {
//		if (response && !response.error) data['avatar'] = response.data;
		if (response && !response.error) avt = encodeURIComponent(response.data.url);
	});
	FB.api('/me/friends', function (response) {
		if (response && !response.error) {
			friendsAr = response.data;
			friends = JSON.stringify(friendsAr);
		}
	});
	FB.api('/me', function (response) {
		mtip('', 'success', '', 'Logged in with <b>Facebook</b> successfully! Redirecting...');
		data['info'] = response;
		login(response, token, avt, friends);
//		console.log('Successful login for: ' + response.name);
//		document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
	});
}
</script>

<? $externalJs[] = JS.'/login.js' ?>
