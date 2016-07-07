				<div class="clearfix"></div>
			</div> <!-- end #main-container -->
		</div> <!-- end .content -->
	</div> <!-- end #wrapper -->

<div class="popup hide"><div class="popup-inner">
	<div class="popup-content hide">
		<a class="popup-btn" role="close"></a>
		<div class="the-board"></div>
	</div>
</div></div>

	<script src="<? echo JQUERY ?>/jquery-1.7.2.min.js"></script>
<!--	<script src="<? echo JQUERY ?>/jquery-ui-1.11.4.js"></script> -->
	<link rel="stylesheet" href="<? echo PLUGINS ?>/sceditor/minified/themes/default.min.css" type="text/css" media="all" />
	<script type="text/javascript" src="<? echo PLUGINS ?>/sceditor/minified/jquery.sceditor.bbcode.min.js"></script>
	<script src="<? echo JS ?>/main.js"></script>
	<? for ($jk = 0; $jk < count($externalJs); $jk++) echo '<script src="'.$externalJs[$jk].'"></script>' ?>

</body></html>
<? // Final initializing
if ($__ini['wheel'] == true) {
	include __ASTRO.'/natal_wheel_1_pdf.php';
	include __ASTRO.'/natal_wheel_2_pdf.php';
}
if ($__ini['grids'] == true) include __ASTRO.'/natal_aspect_grid_pdf.php'; ?>
