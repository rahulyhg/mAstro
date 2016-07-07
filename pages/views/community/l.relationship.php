<? $totalRates = $averageRate = 0;
$rates = $getRecord -> GET($sType.'_ratings^rate', "`iid` = '{$sid}' ", '', '');
$numRates = $sCmt = count($rates);
foreach ($rates as $rates) {
	$averageRate = $averageRate + $rates['rate'];
	$totalRates = $totalRates + $rates['rate']*100/5;
}
$averageRate = number_format(($averageRate/$numRates), 1);
$thumbAr = explode('-', $sIn['thumb']) ?>
<div class="post-note">
	<a href="<? echo $sAu['link'] ?>"><? echo $sAu['name'] ?></a> created a <a href="<? echo $rLink.'/'.$sIn['uname'].'/'.$sIn['n'] ?>">relationship chart</a>
	<span class="right post-timemini"><? echo timeFormat($sIn['time']) ?></span>
</div>
<div class="post-icons">
	<div class="post-time updated" title="<? echo date('d.m.Y H:i', $sIn['time']) ?>">
		<span class="day"><? echo date('d', $sIn['time']) ?></span>
		<span class="month"><? echo date('M', $sIn['time']) ?></span>
	</div>
	<span class="icon-format"></span>
	<div class="clearfix"></div>
	<div class="post-author left">
		<a data-online="<? echo $sAu['online'] ?>" href="<? echo $sAu['link'] ?>"><img src="<? echo $sAu['avatar'] ?>" title="<? echo $sAu['name'] ?>" class="thumb img-rounded post-author-avt"/></a>
	</div>
	<div class="post-sta">
		<div class="post-views">
			<span class="fa fa-eye"></span> <span class="post-sta-num"><? echo $sIn['views'] ?></span>
		</div>
		<div class="post-ratings" title="<? echo $numRates ?> people rated this mix">
			<span class="fa fa-star"></span> <span class="post-sta-num"><? echo $averageRate ?></span>
		</div>
	</div>
</div>
<div class="post-info">
	<div class="post-thumbs">
		<div class="post-thumb-img"><div class="post-thumb-img-inner">
			<div class="post-thumb-btns">
				<div class="post-thumb-view-photo" data-href="<? echo $rLink.'/'.$sIn['uname'].'/'.$sIn['n'] ?>"><span class="fa fa-search"></span></div>
				<div class="post-thumb-link" data-href="<? echo $rLink.'/'.$sIn['uname'].'/'.$sIn['n'] ?>"><span class="fa fa-link"></span></div>
			</div>
			<img class="post-thumb left" style="width:50%" src="<? echo zBg.'/zodiac-art-'.$thumbAr[0].'.jpg' ?>"/>
			<img class="post-thumb left" style="width:50%" src="<? echo zBg.'/zodiac-art-'.$thumbAr[1].'.jpg' ?>"/>
		</div></div>
	</div>
	<div class="post-details">
		<div class="post-title"><a href="<? echo $rLink.'/'.$sIn['uname'].'/'.$sIn['n'] ?>"><? echo str_replace('::', ' - ', $sIn['name']) ?></a></div>
		<div class="post-des hide">
			<div class="post-des-shorten"><? echo nl2br($sIn['content']) ?></div>
		</div>
	</div>
</div>
<? $rList = $getRecord -> GET($sType.'_ratings', "`iid` = '{$sid}' AND `show` = 1 ", '', '`rate` DESC, LENGTH(likes) DESC, LENGTH(content) DESC', 3);
$sCmtLoad = 1; $getFav = 0; $staType = 'ratings';
include 'l.fullSta.php' ?>
