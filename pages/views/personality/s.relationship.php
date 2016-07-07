<section id="relationship" class="hide">
	<div class="chart-report-head htitle"><? echo strtoupper($mIn['mbti']).' '.$lang['and'].' '.$lang['relationships'] ?></div>
	<div class="chart-report-content">
		<div class="paragraph" id="<? echo $mIn['mbti'].'-relationship' ?>" data-trans-num="<? echo countTrans(astro($mIn['mbti'].'-relationship')['id']) ?>">
			<h3><? echo strtoupper($mIn['mbti']).' '.$lang['and'].' '.$lang['relationships'] ?></h3>
			<div><? echo astro($mIn['mbti'].'-relationship')['content'] ?></div>
		</div>
	</div>
</section>
