<section id="overview">
	<div class="chart-report-head htitle"><? echo strtoupper($mIn['mbti']).' '.$lang['overview'] ?></div>
	<div class="chart-report-content">
		<div class="paragraph" id="<? echo $mIn['mbti'] ?>" data-trans-num="<? echo countTrans(astro($mIn['mbti'])['id']) ?>">
			<h3><? echo astro($mIn['mbti'])['title'] ?></h3>
			<div><? echo astro($mIn['mbti'])['content'] ?></div>
		</div>
	</div>
</section>
