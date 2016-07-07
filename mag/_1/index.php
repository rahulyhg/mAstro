<? include '../../lib/config.php';
$p = $_GET['p']; ?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>Tạp chí mAstro - Kỳ 1</title>
	<meta name="viewport" content="width = 1050, user-scalable = no" />
	<link rel="stylesheet" href="assets/css.css">
	<link rel="stylesheet" href="<? echo $p ?>/left.css">
	<link rel="stylesheet" href="<? echo $p ?>/right.css">
</head>
<body>
	<div class="m-control m-prev"></div>
	<div class="m-control m-next"></div>
	<div class="m-canvas">
		<div class="m-page">
			<div class="m-page-left"><? include $p.'/left.php' ?></div>
			<div class="m-page-right"><? include $p.'/right.php' ?></div>
		</div>
	</div>
	<script type="text/javascript" src="<? echo JQUERY ?>/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<? echo JS ?>/js/modernizr.2.5.3.min.js"></script>
	<script type="text/javascript" src="assets/js.js"></script>
</body>
</html>
