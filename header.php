<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title><? echo $pTitle ?></title>
		<meta name="description" content="Free Astrological tool. Get your free horoscope - and much more! All about astrology Astrological Zodiac community, charts and reports...">
		<meta name="keywords" content="Astrodienst, horoscope, horoscopes, horoscope 2013, free horoscopes, daily horoscope, astrology, love, aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces, zodiac, starsigns, forecast, yearly horoscope, liz greene, robert hand, sunsign, birth chart">
		<meta name="author" content="Miamor West">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link rel="shortcut icon" type="image/x-icon" href="<? echo IMG ?>/logo18x18.png"/>
		<meta property="og:title" content="<? echo $pTitle ?>"/>
		<meta property="og:url" content="<? echo MAIN_URL ?>">
		<meta property="og:image" content="<? echo IMG ?>/logo.png"/>
		<meta property="og:content" content="Free Astrological tool. Get your free horoscope - and much more! All about astrology Astrological Zodiac community, charts and reports...">

		<!-- FONT CSS -->
		<link rel="stylesheet" href="<? echo CSS ?>/font-awesome.min.css">
		<link rel="stylesheet" href="<? echo CSS ?>/font.css">
<!--		<link rel="stylesheet" href="<? echo CSS ?>/jquery-ui.min.css">
		<link href='http://fonts.googleapis.com/css?family=Dosis|Abel|PT+Sans+Narrow|Josefin+Sans|Source+Code+Pro|Source+Sans+Pro|Open+Sans+Condensed:300|Pacifico|Chewy|Kaushan+Script|Asap|Ubuntu+Condensed|Ubuntu+Mono|Oswald|Roboto+Condensed|Yanone+Kaffeesatz|Indie+Flower|Archivo+Narrow|Architects+Daughter|Pathway+Gothic+One|Titillium+Web|Alegreya+Sans+SC|Patrick+Hand|Patrick+Hand+SC|Lobster|Alegreya+Sans&subset=latin,vietnamese' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="<? echo CSS ?>/reset.css" media="screen">
		<link rel="stylesheet" href="http://chuoi.info/blog/wp-content/themes/Glider/inc/icons/css/icon-font-style.css?ver=4.2">
		<link rel="stylesheet" href="<? echo CSS ?>/text.css" media="screen">
		<link rel="stylesheet" href="<? echo CSS ?>/icons/icons.css" media="screen"> -->
		<link rel="stylesheet" href="<? echo CSS ?>/style.min.css" media="screen">
		<link rel="stylesheet" href="<? echo CSS ?>/custom.css" media="screen">
		<link id="custom-style" rel="stylesheet" href="<? echo CSS ?>/styles/red.css" media="screen">
<? 		echo '<script>var MAIN_URL = "'.MAIN_URL.'";</script>'; ?>
	</head>
 
<body class="tooltips">

	<div id="wrapper" class="page-content">

		<div class="left-sidebar">
			<div class="left-top">
				<a class="logo" href="<? echo MAIN_URL ?>"><span class="fa fa-fire"></span> mAstro</a>
				<div class="lang">
				<? foreach ($lgAr as $lgK => $lgO) { ?>
					<a <? if ($lg == $lgK) echo 'class="active"' ?> lang="<? echo $lgK ?>" title="<? echo $lgO ?>"><img src="<? echo IMG ?>/flags/<? echo $lgK ?>.png"></a>
				<? } ?>
				</div>
			</div> <!-- .left-top -->
			<div class="navbar"><ul>
				<li class="<? if ($page == 'community') echo 'active' ?>"><a href="<? echo MAIN_URL ?>">Home</a></li>
				<li class="<? if ($page == 'chart') echo 'active' ?>"><a href="<? echo $cLink ?>">Natal chart</a></li>
				<li class="<? if ($page == 'transit') echo 'active' ?>"><a href="<? echo $tLink ?>">Transit</a></li>
				<li class="<? if ($page == 'relationship') echo 'active' ?>"><a href="<? echo $rLink ?>">Relationship compability</a></li>
				<li class="<? if ($page == 'mag') echo 'active' ?>"><a href="<? echo $mLink ?>">Magazine</a></li>
				<li class="<? if ($page == 'blog') echo 'active' ?>"><a href="<? echo $bLink ?>">Blog</a></li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown">Others</a>
					<ul class="dropdown-menu with-triangle primary">
						<li class="<? if ($page == 'friend') echo 'active' ?>"><a href="<? echo $fLink ?>">Friends</a></li>
						<li><a href="<? echo $sLink ?>">Sources library</a></li>
<!--						<li><a href="<? echo $pLink ?>">Personality test</a></li> -->
					</ul>
				</li>
				<li class="divide"></li>
				<li class="<? if ($page == 'about') echo 'active' ?>"><a href="<? echo $aLink ?>">About</a></li>
			</ul></div>
			<div class="left-bottom">
			<form class="search-form">
				<input type="text" name="keywords" class="search-input" placeholder="Input something..."/>
			</form>

			<div class="noti-right-bar right">
			<? if ($u) { ?>
				<ul class="nav-users">
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown">
							<? if ($notiNums > 99) echo '<span class="badge badge-primary icon-count">99+</span>';
							else if ($notiNums > 21) echo '<span class="badge badge-primary icon-count">21+</span>';
							else if ($notiNums > 0) echo '<span class="badge badge-primary icon-count">'.$notiNums.'</span>' ?>
							<i class="fa fa-globe" style="font-size:17px"></i>
						</a>
						<ul class="dropdown-menu with-triangle pull-left">
							<li>
								<div class="nav-dropdown-heading">Notifications</div>
								<div class="nav-dropdown-content scroll-nav-dropdown">
									<ul class="notification-load">
										<? include MAIN_PATH.'/pages/views/noti.php' ?>
									</ul>
								</div>
								<div class="btn btn-primary btn-block">See all notifications</div>
							</li>
						</ul>
					</li>
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown">
							<? if ($mesNums > 99) echo '<span class="badge badge-warning icon-count">99+</span>';
							else if ($mesNums > 21) echo '<span class="badge badge-warning icon-count">21+</span>';
							else if ($mesNums > 0) echo '<span class="badge badge-warning icon-count">'.$mesNums.'</span>' ?>
							<i class="fa fa-inbox" style="font-size:17px"></i>
						</a>
						<ul class="dropdown-menu with-triangle pull-left">
							<li>
								<div class="nav-dropdown-heading">
									Messages
								</div>
								<div class="nav-dropdown-content scroll-nav-dropdown">
									<ul class="notification-load">
										<? //include 'pages/views/inbox.php' ?>
									</ul>
								</div>
								<div class="btn btn-primary btn-block" href="<? echo MAIN_URL ?>/inbox">See all messages</div>
							</li>
						</ul>
					</li>
				</ul>
			<? } ?>
			</div>

			<div class="user-right-bar right">
				<ul class="nav-users">
					<li class="dropdown">
					<? if ($u) { ?>
						<a class="dropdown-toggle" data-toggle="dropdown">
							<img src="<? echo $member['avatar'] ?>" class="avatar img-circle">
							<strong class="s-title"><? echo $member['name'] ?></strong>
						</a>
						<ul class="dropdown-menu with-triangle primary pull-left">
							<li><a href="<? echo $member['link'] ?>">Me</a></li>
							<li><a href="<? echo MAIN_URL ?>/charts">My charts</a></li>
							<li><a href="<? echo MAIN_URL ?>/profile">Profile</a></li>
							<li class="divider"></li>
							<li><a href="<? echo MAIN_URL ?>/logout">Logout</a></li>
						</ul>
					<? } else { ?>
						<a class="dropdown-toggle" href="<? echo MAIN_URL ?>/login/"><span class="fa fa-sign-in"></span> Login</a>
					<? } ?>
					</li>
				</ul>
			</div>
			<div class="copyright">
				<span>©</span>
				<span class="hide">2015 Miamor West</span>
			</div>
			</div> <!-- .left-bottom -->

		</div>
		
		<div class="content">
			<div id="main-container">

