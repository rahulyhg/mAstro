<? header('Content-Type: text/html; charset=utf-8');
//if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start();
session_start();
//error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
error_reporting(E_ERROR | E_PARSE);

require_once 'conf.php';

define('LIB', MAIN_URL.'/lib');
define('ASSETS', MAIN_URL.'/assets');
define('CSS', ASSETS.'/css');
define('IMG', ASSETS.'/img');
define('silk', IMG.'/famfamfam/silk');
define('JS', ASSETS.'/js');
define('JQUERY', JS.'/jquery');
define('PLUGINS', ASSETS.'/plugins');
define('FLAT_UI', PLUGINS.'/flat-ui');
define('MAG', MAIN_URL.'/mag');
$serverUrl = $_SERVER['REQUEST_URI'];
$libPath = MAIN_PATH.'/lib';
define('__ASTRO', $libPath.'/astro');
define('zBg', MAIN_URL.'/data/zodiac');
define('HTML2PDF', MAIN_PATH.'/lib/html2pdf');

$pTitle = 'mAstro';

require_once 'func.lib.php';

$current = $time = date('d-m-Y H:i');
$today = date('d-m-Y');
$todayYMD = date('Y-m-d');
$todayl = date('l');
$todayD = date('D');
$todayd = (int)date('d');
$todaym = (int)date('m');
$todayY = (int)date('Y');
$now = date('dHis');
$curint = (int)date('ymdHi');
$nowFull = (int)date('YmdHis');
$nowMS = date('is');
$nowH = date('H');
$nowS = date('s');
$nowM = date('i');
$m_y = date('ym');
$month = date('ym');

$asLink = MAIN_URL.'/lib/astro';
$rLink = MAIN_URL.'/relationship';
$mLink = MAIN_URL.'/magazine';
$dLink = MAIN_URL.'/report';
$aLink = MAIN_URL.'/about';
$fLink = MAIN_URL.'/friend';
$cLink = MAIN_URL.'/chart';
$uLink = MAIN_URL.'/u';
$tLink = MAIN_URL.'/transit';
$sLink = MAIN_URL.'/source';
$bLink = MAIN_URL.'/blog';
$prLink = MAIN_URL.'/profile';
$pLink = MAIN_URL.'/personality';
$terLink = MAIN_URL.'/terminal';
$current = $curint = $time = strtotime('now');

$er = $Er = array();
$er[000] = 'Oops! Something went wrong.';
$er[001] = 'Please fill in all required fields.';
$er[002] = 'This is already available!';
foreach ($er as $ek => $ee) $Er[$ek] = '[type]error[/type][content]'.$ee.'[/content]';

$lgAr = array(
	'us' => 'English (US)',
	'vn' => 'Tiếng Việt'
);

if ($_SESSION['user_id']) {
	global $user_id, $u;
	$user_id = $u = intval($_SESSION['user_id']);
	$member = getRecord('members', "`id` = '{$u}'");
	$member['name'] = $member['first_name'].' '.$member['last_name'];
	$member['link'] = $uLink.'/'.$member['username'];
	$username = $member['username'];
	$memberFriendsAr = array();
	if ($member['friends']) $memberFriendsAr = explode(',', $member['friends']);
	$memberFriends = count($memberFriendsAr);
	$notiNums = countRecord('notification', "`to_uid` = '{$u}' AND `read` = 0");
}
if (!$_SESSION['lang']) {
	if ($_SESSION['user_id'] && $member['lang']) $_SESSION['lang'] = $member['lang'];
	else $_SESSION['lang'] = key($lgAr);
}
$lg = $_SESSION['lang'];
require_once 'lang/'.$lg.'.php';

?>
