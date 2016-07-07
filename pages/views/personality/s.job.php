<section id="job" class="hide">
	<div class="chart-report-head htitle"><? echo strtoupper($mIn['mbti']).' '.$lang['and'].' '.$lang['job'] ?></div>
	<div class="chart-report-content">
		<div class="paragraph" id="<? echo $mIn['mbti'].'-job' ?>" data-trans-num="<? echo countTrans(astro($mIn['mbti'].'-job')['id']) ?>">
			<h3><? echo strtoupper($mIn['mbti']).' '.$lang['and'].' '.$lang['job'] ?></h3>
			<div><? echo astro($mIn['mbti'].'-job')['content'] ?></div>
		</div>
	</div>
</section>
