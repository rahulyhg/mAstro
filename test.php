<? include 'lib/config.php';
echo date('d M Y', strtotime('29 July 1997')).'~~~<br/>';
//echo exec('whoami', $out, $error) .'<br/>';
	$swephsrc = 'sweph';
	$sweph = 'sweph';

  $swephSrc  = '/opt/lampp/htdocs/astro/sweph/';
  $sweExec = '/opt/lampp/htdocs/astro/sweph/swetest';
  $cmd = "$sweExec -edir$sweSrc -b28.07.1997 -ut18:10:00 -p0123456789DAttt -eswe -house105.85,21.033333333333,p -flsj -g, -head 2>&1";
  echo $cmd.'<br/>';
 exec ($cmd, $out, $error);
echo $error.'~~<br/><br/>';
//exec ("$sweExec -edir$sweph -b28.07.1997 -ut18:10:00 -p0123456789DAttt -eswe -house105.85,21.033333333333,p -flsj -g, -head", $out);
print_r($out);
echo '<br/><hr/>';
exec("dir",$out,$returnval); 
print_r($out); ?>
<br/>
<br/>
<? if (!extension_loaded('imagick'))
	echo 'imagick not installed';

phpInfo();
$ext = get_loaded_extensions();
#print_r($ext);

$im = new \Imagick();

$base->trimImage(0);

$geometry = $base->getImageGeometry();
$pageInfo = $base->getImagePage();

printf (
    "Width %d Height %d\n",
    $geometry['width'],
    $geometry['height']
);

printf(
    "OffsetX: %d OffsetY %d\n",
    $pageInfo['x'],
    $pageInfo['y']
); ?>
