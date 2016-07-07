<? require_once 'lib/config.php';
if (check($page, '?') > 0) $PAGE = $page.'&';
else $PAGE = $page;

//$page = rtrim($page);
$page = preg_replace('~/+~', '/', $page);
$pageAr = explode('/', explode('?', $page)[0]);
$page = $pageAr[0];
$n = $pageAr[1];
$requestAr = explode('?', $PAGE);
$request = $requestAr[1];

$v = get('v');
$type = get('type');
$do = get('do');

$allowAr = array('about', 'source', 'error', 'logout');
if (!$page) $page = 'community';
if (!$u && !in_array($page, $allowAr)) $page = 'login';
if (!file_exists('pages/'.$page.'.php')) $page = 'error';
if ($page) include 'pages/'.$page.'.php';

if ($page != 'admincp' && !$do && !$v) include MAIN_PATH.'/footer.php' ?>
