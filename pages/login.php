<? $pTitle = 'Login/Sign up';
//include '../lib/config.php';
//$do = $_GET['do'];
if (!$do) include 'header.php';

if ($u) echo '<div class="alerts alert-info">You\'ve already been logged in.</div>';
else if (!$do) include 'pages/views/'.$page.'/view.php';
else include 'pages/system/'.$page.'/'.$do.'.php';
 ?>
