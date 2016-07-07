<section id="famous" class="hide">
	<div class="chart-report-head htitle"><? echo ucfirst($lang['famous']).' '.$lang['as^in'].' '.strtoupper($mIn['mbti']) ?></div>
	<div class="chart-report-content">
		<div class="paragraph" id="<? echo $mIn['mbti'].'-famous' ?>" data-trans-num="<? echo countTrans(astro($mIn['mbti'].'-famous')['id']) ?>">
			<div><? echo astro($mIn['mbti'].'-famous')['content'] ?></div>
		</div>
	</div>
</section>
