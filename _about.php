<? require_once 'lib/config.php';
include 'header.php' ?>

<!--BEGIN PAGE CONTENT-->

<section class="module parallax" style="background-image:url('data/cover/autumn/4.jpg')">
	<div class="container">
		<h1 style="margin:370px 0 220px">Easy way to manage things</h1>
	</div>
</section>

<section class="module contents">
	<h3>About us</h3>
	Pushme is one the easy way to manage things, more than just a blog or a campaign, right on our server.<br/>
</section>


<section class="module parallax" style="background-image:url('data/cover/autumn/5.jpg')">
	<div class="container">
		<h1 style="margin:260px 0 200px">Combination of Simplicity and Flexibility</h1>
	</div>
</section>

<section class="module contents">
	Pushme is planned to be flexible for every kinds of campaigns or communities you wish to manage.<br/>
	We focus on how to make you feel simplest to manage the most complex things could appear round your communities.<br/>
</section>


<section class="module parallax" style="background-image:url('data/cover/autumn/8.jpg')">
	<div class="container">
		<h1 style="margin:330px 0 100px">Feel free to style</h1>
	</div>
</section>

<section class="module contents">
	Since we're not up to make this open source, we'll always try to give you as much freedom as we could to style your own page. Yes, right on our server.<br/>
	But that's also why you might only be able to play with css, javascript (jquery,..) and some basic html codes, not our core elements.<br/>
	But css is extremely powerful, I think you'll be fine with it.
</section>


<section class="module parallax" style="background-image:url('data/cover/winter/3.jpg')">
	<div class="container">
		<h1 style="margin:330px 0 100px">Feedbacks</h1>
	</div>
</section>

<section class="module contents">
	<div class="col-lg-7">
		Currently we have only 1 person coding the whole system. Therefore, we can't be sure that there will be no errors during your connection.<br/>
		<blockquote class="light" style="font-size:15px;line-height:27px">
			So please, if you meet a bug, report it to me, i'll fix it as fast as possible.<br/><br/>
		Or just basically tell me what you think of this, the system, the usage,...<br/><br/>
		I'm currently working on the documentation, the issues page, the survey, the guide tour, the forum, logos,... and the main site.<br/>
		I think my mind's gonna blew away... Please, if you're free and interested in this project, contact me via email <a>vyskzio@gmail.com</a>, I really need help.<br/><br/>
		This is the first beta, issues page will be available in next beta.<br/><br/>
		Thanks.<br/>
		Admin.
		</blockquote>
	</div>
	<div class="col-lg-5" id="feedbacks">
		<? include $iSys.'/new.php'; ?>

		<form id="ExampleBootstrapValidationForm" action="<? echo $iLink ?>/new/submit" class="new-message bootstrap-validator-form">
			<h3>Send us some feedbacks</h3>
			<div class="col-md-12">
				<div class="form-group has-feedback">
					<textarea style="height:130px" class="form-control message full-me" name="contents" placeholder="Tell us more about your need so that users could help you better."><? echo $iIn['message'] ?></textarea>
					<div class="clearfix"></div>
				</div>
				<div class="form-group bottom-fields">
					<div class="buttons right" style="margin-right:0px">
						<input type="submit" value="Submit"/>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</form>
		<? $externalJs[] = JS .'/inbox/new.js' ?>
	</div>
</section>


<style>.page-content{font-size:18px;line-height:34px;color:#333}
.footer{font-size:14px}
.module.contents{float:none;min-height:300px;margin:40px}
@media (min-width:992px) {
	.module.contents{margin:40px 100px}
}</style>


<!--END PAGE CONTENT-->

			</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="footer">
		<div class="right">Oh God I need some coffee... Or just <a href="<? echo MAIN_URL ?>/about#feedbacks">feedbacks</a></div>
		Copyright © 2014 Pushme
	</div>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
	<script src="<? echo PLUGINS ?>/meditor/jquery.meditor.min.js"></script>
	<script src="<? echo JS ?>/main.min.js"></script>
	<!--BEGIN EXTRA JS-->
	<div class="extra-js">
	<? for ($jk = 0; $jk < count($externalJs); $jk++) 
		echo '<script src="'.$externalJs[$jk].'"></script>' ?>
	</div>
	<!--END EXTRA JS-->
	</body>
</html>
