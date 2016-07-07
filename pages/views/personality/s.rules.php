<section id="rules" class="hide">
	<div class="chart-report-head htitle"><? echo strtoupper($mIn['mbti']).' '.$lang['and'].' '.$lang['rules'].' '.$lang['for'].' '.$lang['success'] ?></div>
	<div class="chart-report-content">
		<div class="paragraph" id="<? echo $mIn['mbti'].'-rules' ?>" data-trans-num="<? echo countTrans(astro($mIn['mbti'].'-rules')['id']) ?>">
			<h3><? echo strtoupper($mIn['mbti']).' '.$lang['and'].' '.$lang['rules'].' '.$lang['for'].' '.$lang['success'] ?></h3>
			<div><? echo astro($mIn['mbti'].'-rules')['content'] ?></div>
		</div>
	</div>
</section>
