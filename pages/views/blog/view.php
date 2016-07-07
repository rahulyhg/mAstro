<? $luminance = get_avg_luminance($bIn['thumb'], 10);
if ($luminance > 170) $cls = 'light';
else $cls = 'dark';

$bList = $getRecord -> GET('blog', "`bid` = '{$iid}' ", '', "`id` ASC");
$bChild = count($bList) ?>
<div class="blog-v blog-bg-<? echo $cls ?>">
	<div class="blog-v-cover">
		<div class="blog-blur">
			<div class="blog-blur-inner" style="background-image:url('<? echo $bIn['thumb'] ?>')"></div>
		</div>
		<div class="blog-v-img">
			<div class="blog-v-img-inner" style="background-image:url('<? echo $bIn['thumb'] ?>')"></div>
		</div>
		<div class="blog-v-title blog-title"><? echo $bIn['title']; if ($nPage) echo ' - '.$bPi['title'] ?></div>
		<div class="blog-v-author">
			<a data-online="<? echo $uIn['online'] ?>" href="<? echo $uIn['link'] ?>">
				<img class="blog-author-avt img-rounded" src="<? echo $uIn['avatar'] ?>"/>
			</a><br/>
			<a class="blog-author-name" href="<? echo $uIn['link'] ?>"><? echo $uIn['name'] ?></a>
		</div>
	</div>
	<div class="blog-v-details">
		<div class="blog-article blog-section-white">
			<div class="col-lg-1"></div>
			<div class="col-lg-<? if ($bChild > 0) echo 8; else echo 10 ?>">
				<div class="blog-v-content">
					<? if ($bPi) echo content($bPi['content']);
					else echo content($bIn['content']) ?>
				</div>
			</div>
			<div class="col-lg-<? if ($bChild > 0) echo 3; else echo 1 ?> no-padding-right">
			<? if ($bChild > 0) { ?>
				<ul class="blog-v-pages">
			<? 	if (!$nPage) $act = ' active'; else $act = '';
				echo '<ul class="blog-v-pages-child">';
				echo '<li class="blog-v-pone'.$act.'"><a href="'.$bLink.'/'.$bIn['link'].'.html">'.$bIn['title'].'</a>';
					if ($bIn['uid'] == $u) echo '<a id="edit-child-blog" class="fa fa-edit"></a>';
				echo '</li>';
				foreach ($bList as $bLo) {
					if ($nPage == $bLo['link']) $actC = ' active'; else $actC = '';
					echo '<li class="blog-v-pone'.$actC.'"><a href="'.$bLink.'/'.$bIn['link'].'.html/'.$bLo['link'].'">'.$bLo['title'].'</a>';
						if ($bIn['uid'] == $u) echo '<a id="edit-child-blog" link="'.$bLo['link'].'" class="fa fa-edit"></a>';
					echo '</li>';
				}
				echo '</ul>';
				if ($bIn['uid'] == $u) echo '<a class="right add-child-blog" style="color:#37bc9b"><span class="fa fa-plus"></span> Add</a>' ?>
				</ul>
			<? } ?>
			</div>
			<div class="clearfix"></div>
		</div>

		<div class="blog-v-related blog-section-white">
			<div class="col-lg-1"></div>
			<div class="col-lg-10">
				<h4>Bài viết cùng chủ đề</h4>
				<ol><? $sL = $getRecord -> GET('blog^title,link', "`bid` = 0 AND `cid` = '{$bIn['cid']}' AND `id` != '{$iid}' ", 5);
				foreach ($sL as $si) { ?>
					<li><a href="<? echo $bLink.'/'.$si['link'].'.html' ?>"><? echo $si['title'] ?></a></li>
				<? } ?>
				</ol>
			</div>
			<div class="col-lg-1"></div>
			<div class="clearfix"></div>
		</div>

		<div class="blog-v-cmts blog-section-white">
			<div class="col-lg-1"></div>
			<div class="col-lg-10">
				<div class="blog-v-cmts-list">
				<? 	$rList = $bCmt;
					$sCmtFull = 1;
					$staType = 'cmt';
					include 'pages/views/community/l.fullSta.php' ?>
				</div>
				<div class="blog-v-add-cmt">
				<? include 'cmtForm.php' ?>
				</div>
			</div>
			<div class="col-lg-1"></div>
			<div class="clearfix"></div>
		</div> <!-- .blog-v-cmts -->
	</div>
</div>
<? $externalJs[] = JS.'/blog/view.js' ?>
<style>.post-full-stas{margin:0;width:100%}
.post-fav{margin-top:3px}</style>
<? function get_avg_luminance($filename, $num_samples=10) {
	$img = imagecreatefromjpeg($filename);
	$width = imagesx($img);
	$height = imagesy($img);
	$x_step = intval($width/$num_samples);
	$y_step = intval($height/$num_samples);
	$total_lum = 0;
	$sample_no = 1;
	for ($x=0; $x<$width; $x+=$x_step) {
		for ($y=0; $y<$height; $y+=$y_step) {
			$rgb = imagecolorat($img, $x, $y);
			$r = ($rgb >> 16) & 0xFF;
			$g = ($rgb >> 8) & 0xFF;
			$b = $rgb & 0xFF;
			// choose a simple luminance formula from here
			// http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
			$lum = ($r+$r+$b+$g+$g+$g)/6;
			$total_lum += $lum;
			// debugging code
			$sample_no++;
		}
	}
	// work out the average
	$avg_lum  = $total_lum/$sample_no;
	return $avg_lum;
}
?>
