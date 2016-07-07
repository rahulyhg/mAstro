<? 	$CURRENT_URL = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
$provider = get('provider'); ?>

<style>.idpico{cursor:pointer;cursor:hand}
#openidm{margin:7px}
.statu{margin:20px 0}
.social-login{position:relative;margin-bottom:30px}
.social-login .genbig{margin-bottom:5px}
a.btn:not(.login-button){max-height:39px!important;padding:10px 12px 9px!important;*line-height:20px!important}
a.btn .fa{font-size:18px}
input.text-input{padding:12px!important;max-height:38px!important;line-height:30px!important;margin-top:4px}
.text-input[type="password"]{padding:5px 12px!important;height:38px!important;line-height:16px!important}
.login-button{line-height:37px!important;padding:0 15px 1px!important;font-family:'Lato';font-size:16px!important;margin-top:4px!important;max-height:39px!important}
h2{padding-left:0}
.form-bottom{background:#fafafa;margin:15px -20px -15px;padding:10px 20px;border-radius:0 0 3px 3px;border-top:1px solid #f7f7f7}
.forgot-password{margin-top:3px;display:block;float:left}
.form-bottom .btn{margin-top:0!important}
.login-button{width:30%;*padding:11px 14px}
.front-login h2{border-bottom:1px solid #f9f9f9;margin:0 0 20px!important;padding:3px 10px 2px!important}
.copyright a:hover{text-decoration:underline}
.c-links a{margin:0 3px}
	</style>

<div class="alerts alert-info">
	mAstro is a totally free astrology tool, but requires an account for furthur usage. It takes only within a minute to have an account and start experincing.<br/>
	Use the <b>Sign up</b> form to create new account and the <b>Login</b> form to login to existing account.<br/>
	Or basically use <b>Login with social network</b> form to generate account with no more than 1 minute.
</div>

<div class="alerts alert-warning">We highly recommend you use <b>Login with social network</b> form to log in, since we're currently working on <span class="italic">friends</span> section on mAstro, therefore, friends list will only be extracted from your Facebook account, which means you must <a>login with Facebook</a> to have friends list updated.</div>

<div class="col-lg-6">
<? if (!$return_to || $provider) { ?>
<form action="<? echo MAIN_URL ?>/login?do=login_social" class="login-social">
<div class="social-login" id="idps">
	<h3 class="bor">Login with social network</h3>
	<div class="col-lg-12">
		<a idp="facebook" id="login-facebook" href="<? echo MAIN_URL ?>/login/facebook" class="btn btn-facebook idpicos"><i class="fa fa-facebook"></i></a> 
	</div>
	<div class="clearfix"></div>
</div>
</form>
<? } ?>

<form action="<? echo MAIN_URL ?>/login?do=login" class="login">
	<h3 class="bor">Login</h3>
	<div class="form-group">
		<div class="col-lg-3 control-label">Username</div>
		<div class="col-lg-9">
			<input type="text" name="username" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 control-label">Password</div>
		<div class="col-lg-9">
			<input type="password" name="password" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="add-form-submit center">
		<input type="reset" value="Reset"/>
		<input type="submit" value="Submit"/>
	</div>
</form>
</div>

<form action="<? echo MAIN_URL ?>/login?do=signup" class="signup col-lg-6 bootstrap-validator-form">
	<h3 class="bor">Sign up</h3>
	<div class="form-group">
		<div class="col-lg-4 control-label">Username</div>
		<div class="col-lg-8">
			<input type="text" name="username" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">First name</div>
		<div class="col-lg-8">
			<input type="text" name="first_name" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Last name</div>
		<div class="col-lg-8">
			<input type="text" name="last_name" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Email</div>
		<div class="col-lg-8">
			<input type="text" name="email" class="form-control" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Password</div>
		<div class="col-lg-8">
			<input type="password" name="password" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-4 control-label">Confirm password</div>
		<div class="col-lg-8">
			<input type="password" name="confirm_password" class="form-control"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="add-form-submit center">
		<input type="reset" value="Reset"/>
		<input type="submit" value="Submit"/>
	</div>
</form>

<? $externalJs[] = JS.'/login.js';
$externalJs[] = JS.'/jquery.passstrength.min.js'; ?>
