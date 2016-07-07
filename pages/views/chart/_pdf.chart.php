<?php
require_once(HTML2PDF.'/html2pdf.class.php');
// get the HTML
ob_start('sanitize_output');
include(dirname(__FILE__).'/pdf.chart.html.php');
$content = ob_get_clean();
$content = '<page backtop="15mm" backbottom="15mm" backleft="20mm" backright="20mm" style="font-family: dejavusanscondensed; font-size:14px;line-height:25px">'.($content).'</page>';

// convert to PDF
try {
	$html2pdf = new HTML2PDF('P', 'A4', 'fr');
	$html2pdf->pdf->SetDisplayMode('real');
	$html2pdf->writeHTML($content, isset($_GET['vuehtml']));
	$html2pdf->Output('utf8.pdf');
}
catch (HTML2PDF_exception $e) {
	echo $e;
	exit;
}
