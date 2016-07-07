<? $rAr = array(
	1 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 6,
	),
	2 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 4,
	),
	3 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 4,
	),
	4 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 6,
	),
	5 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 5,
	),
	6 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 4,
	),
	7 => array(
		1 => 1, 2 => 2, 3 => 3, 4 => 4,
	),
	8 => array(
		1 => 2, 2 => 3, 3 => 4, 4 => 5,
	),
	9 => array(
		1 => 2, 2 => 4, 3 => 6, 4 => 8,
	),
	10 => array(
		1 => 7, 2 => 5, 3 => 1, 4 => 3,
	),
);
function res ($val, $min, $max) {
	return ($val >= $min && $val <= $max);
}
if ($do == 'done') {
	$data = $_POST['quiz_results'];
	$dataAr = json_decode($data, true);
	$g = 0;
	foreach ($dataAr as $i => $vl) $g += $rAr[$i][$vl];
	if (res($g, 12, 20)) $res = 'Bạn là người rụt rè, không quen ở chỗ đông người. Đôi khi bạn không tự tin với hình thể của mình và từ đó bạn không tự tin về tất cả thứ khác. Bạn rất thông minh, tận tình dù ít người nhận ra điều đó vì bạn thật sự …ít để người khác biết về mình. Bạn thích những bài hát và phim về tình yêu, thích ngồi nhà tự tìm niềm vui hơn là đi chơi với bạn bè, một phần vì bạn rất sợ bị tổn thương.

=> Dũng cảm lên và mở trái tim mình ra với bạn bè: Nếu bạn là 1 người bạn tốt thì chắc chắn có rất nhiều cũng muốn làm bạn tốt của bạn đó. Bạn ko thể tận hưởng hết những niềm vui của cuộc sống nếu bạn mãi mãi chỉ tìm niềm vui của mình!';
	if (res($g, 12, 20)) $res = 'Bạn là người rụt rè, không quen ở chỗ đông người. Đôi khi bạn không tự tin với hình thể của mình và từ đó bạn không tự tin về tất cả thứ khác. Bạn rất thông minh, tận tình dù ít người nhận ra điều đó vì bạn thật sự …ít để người khác biết về mình. Bạn thích những bài hát và phim về tình yêu, thích ngồi nhà tự tìm niềm vui hơn là đi chơi với bạn bè, một phần vì bạn rất sợ bị tổn thương.

=> Dũng cảm lên và mở trái tim mình ra với bạn bè: Nếu bạn là 1 người bạn tốt thì chắc chắn có rất nhiều cũng muốn làm bạn tốt của bạn đó. Bạn ko thể tận hưởng hết những niềm vui của cuộc sống nếu bạn mãi mãi chỉ tìm niềm vui của mình!';
	else if (res($g, 21, 30)) $res = 'Bạn tìm con đường riêng của mình để bước vào thế giới và không hề ngại gặp những chướng ngại vật. Có vẻ như bạn là người rất có kinh nghiệm, đã từng gặp những rắc rối nhưng đều can đảm vượt qua. Bạn hoặc là rất bình tĩnh khi gặp mọi chuyện phiền phức, hoặc là rất nóng nảy, luôn muốn lãnh đạo mọi người. Là 1 con người độc lập và rất lãng mạn nhưng bạn vẫn chưa nghĩ rằng mình đã đến lúc sẵn sàng cho một tình yêu. Bạn coi cuộc sống tràn ngập niềm vui và bạn muốn làm cho nó tuyệt vời hơn nữa. Bạn cũng là người rất mê thể thao.

=>Bạn thường ko sợ những thử thách trong cuộc sống, nhưng cũng nên cẩn thận nhé, đừng liều trong mọi trường hợp, có những khi không đáng phải thế đâu!';
	else if (res($g, 31, 42)) $res = 'Nhìn chung, bạn là một người hài hòa. Bạn thể hiện cảm xúc khá rõ rệt, đối với bạn bây giờ thì bạn bè là trên hết, đặc biệt là những buổi liên hoan tụ tập bạn bè. Bạn chẳng mấy khi gặp trục trặc gì trong việc bắt chuyện và làm quen với người khác. Bạn thích các hoạt động ngoài trời, đôi khi cũng ghen tị với những người hơn mình nhưng ko bao giờ giữ cảm xúc đó lâu. Bạn bè đều nghĩ bạn rất đáng tin cậy.';
	else if (res($g, 43, 53)) $res = 'Đôi khi bạn thấy 24 tiếng 1 ngày là không đủ cho mình làm tất cả những gì mình thích. Bạn không bao giờ để một ngày trôi qua buồn bã vì bạn khiến cho mọi việc tươi vui lên. Bạn luôn sống tích cực và cố gắng hết mình ở bất kì việc gì. Bạn ít khi quan tâm đến việc người khác đánh giá mình thế nào, và không bao giờ ngại thể hiện mình trước đám đông. Bạn có mức năng lượng rất cao nhưng luôn thể hiện ra bằng một vẻ ngoài bình tĩnh. Rất thích chơi thể thao, thích hoạt động và thích tạo xu hướng hơn là đi theo xu hướng. Điều tích cực là bạn chẳng bao giờ buồn lâu cả!

=> Điều quan tâm nhất đối với bạn là đừng để bạn bè cho rằng bạn quá kiêu đấy nhá. Tự tin là tốt và biết vượt lên trên dư luận cũng càng tốt, nhưng có nhiều điều đáng để bạn học hỏi ở từng người mà bạn có đấy.';
	$nn = countRecord('mbti', "`uid` = '{$u}' ") + 1;
	$check = getRecord('mbti', "`type` = '{$n}' AND `uid` = '{$u}' AND `uname` = '{$member['username']}' AND `mbti` = '{$g}' ");
	if ($check['id']) echo $pLink.'/u/'.$check['uname'].'/'.$check['n'];
	else {
		$ins = insert('mbti', "`type`, `uid`, `uname`, `n`, `full`, `gender`, `mbti`, `mbti_data`, `time`", " '{$n}', '{$u}', '{$member['username']}', '{$nn}', '{$full}', '{$gender}', '{$g}', '{$res}', '{$current}' ");
		if ($ins) {
			$check = getRecord('mbti', "`type` = '{$n}' AND `uid` = '{$u}' AND `uname` = '{$member['username']}' AND `mbti` = '{$g}' ");
			echo $pLink.'/u/'.$check['uname'].'/'.$check['n'];
		}
	}
} ?>
