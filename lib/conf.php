<? define("DB_SERVER", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_NAME", "astro");
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

$dbName = DB_NAME;
$con = mysql_connect(DB_SERVER, DB_USER, DB_PASS);
$db_select = mysql_select_db(DB_NAME, $con);
mysql_set_charset("utf8", $con);

$pattern = 'astro';
define('MAIN_PATH', './');
//define('MAIN_PATH', '/opt/lampp/htdocs/astro');
define('HOST_URL', '//localhost/'.$pattern);
define('MAIN_URL', 'http:'.HOST_URL);
define('SWEPH', MAIN_PATH.'/sweph/');
define('_SWEPH_EXEC', SWEPH.'swetest');

$page = str_replace('/'.$pattern.'/', '', $_SERVER['REQUEST_URI']);


$social_conf = array(
	'Facebook' => array(
		"id" => "1453024741651795",
		"secret" => "9b8f7c2b0d59a70c4e3d2bb161990624",
	),
); ?>
