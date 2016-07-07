<?
define('FPDF_FONTPATH', MAIN_PATH.'/lib/fpdf/font/');
require (MAIN_PATH.'/lib/fpdf/tfpdf.php');
include '__initialize.php';
include '__initialize.dominant.php';

class PDF extends tFPDF {
	var $B;
	var $I;
	var $U;
	var $HREF;

	// Page header
	function Header()
	{
		$this->Ln(10);
	}

	// Page footer
	function Footer()
	{
		// Position at 1.5 cm from bottom
		$this->SetY(-15);
		$this->SetFont('Arial', 'I', 8);
		$this->Cell(0, 10, 'Page '.$this->PageNo().' of {nb}', 0, 0, 'C');
	}

	function PDF($orientation='P', $unit='mm', $size='Letter')
	{
		// Call parent constructor
		$this->tFPDF($orientation,$unit,$size);

		// Initialization
		$this->B = 0;
		$this->I = 0;
		$this->U = 0;
		$this->HREF = '';
	}

	function WriteHTML($html)
	{
		// HTML parser
		$html = str_replace("\n",' ', $html);
		$a = preg_split('/<(.*)>/U', $html, -1, PREG_SPLIT_DELIM_CAPTURE);
		foreach ($a as $i=>$e) {
			if ($i%2 == 0) {
				// Text
				if ($this->HREF) $this->PutLink($this->HREF,$e);
				else $this->Write(8, $e);
			} else {
				// Tag
				if ($e[0]=='/') $this->CloseTag(strtoupper(substr($e,1)));
				else {
					// Extract attributes
					$a2 = explode(' ', $e);
					$tag = strtoupper(array_shift($a2));
					$attr = array();
					foreach ($a2 as $v) {
						if (preg_match('/([^=]*)=["\']?([^"\']*)/', $v, $a3)) $attr[strtoupper($a3[1])] = $a3[2];
					}
					$this->OpenTag($tag, $attr);
				}
			}
		}
	}

	function OpenTag($tag, $attr)
	{
		// Opening tag
		if($tag=='B' || $tag=='I' || $tag=='U')
		$this->SetStyle($tag,true);
		if($tag=='A')
		$this->HREF = $attr['HREF'];
		if($tag=='BR')
		$this->Ln(5);
	}

	function CloseTag($tag)
	{
		// Closing tag
		if($tag=='B' || $tag=='I' || $tag=='U')
		$this->SetStyle($tag,false);
		if($tag=='A')
		$this->HREF = '';
	}

	function SetStyle ($tag, $enable)
	{
		// Modify style and select corresponding font
		$this->$tag += ($enable ? 1 : -1);
		$style = '';
		foreach(array('B', 'I', 'U') as $s) {
			if ($this->$s>0) $style .= $s;
		}
		$this->SetFont('',$style);
	}

	function PutLink ($URL, $txt)
	{
		// Put a hyperlink
		$this->SetTextColor(0,0,255);
		$this->SetStyle('U',true);
		$this->Write(5,$txt,$URL);
		$this->SetStyle('U',false);
		$this->SetTextColor(0);
	}
}

function center_this_graphic_horizontally ($filename, $width_of_pdf) {
	//get dimensions of graphic - 3.78 px = 1 mm (we assume there are 96 dpi in each graphic)
	$size = getimagesize($filename);
	
	$graphic_width = $size[0] / 3.78;		 //graphic width in mm
	
	$x_axis_value = ($width_of_pdf - $graphic_width) / 2;
	
	return $x_axis_value;
}

function center_this_HTML_text_horizontally ($width, $width_of_pdf) {
	return ($width_of_pdf - $width) / 2;
}

function print_justified_paragraphs ($text, $pdf) {
	$text = str_replace(
			array('&nbsp;', '<strong>', '</strong>', '<em>', '</em>'),
			array(' ', '<b>', '</b>', '<i>', '</i>'),
			$text);
	$text = preg_replace('/\<br\/\>|\<br\>/', '<br />', $text);
	$x = explode("<br />", $text);
	for ($i = 0; $i < count($x) - 1; $i++) {
		$txt = $x[$i];
//		$txt = strip_tags($x[$i], '<b><a><i>'); // Filter html characters out
		$txt = strip_tags($txt); // Filter html characters out
		$pdf->MultiCell(0, 7, $txt);
//		$pdf->WriteHTML($txt);
	}
}

//$pdf = new tFPDF();
//$pdf->AddPage();

$pdf = new PDF('P', 'mm', 'Letter');			//'L' defines landscape mode, 'P' defines portrait mode
$width_of_pdf = 216;							//specify width of pdf

$pdf->SetTitle("Astrological Natal Chart");
$pdf->SetAuthor('Allen Edwall');
$pdf->AliasNbPages();

$left_margin = 26;
$right_margin = 26;

// Add a Unicode font (uses UTF-8)
$pdf->AddFont('DejaVu', '', 'DejaVuSansCondensed.ttf', true);
$pdf->AddFont('DejaVu', 'B', 'DejaVuSansCondensed-Bold.ttf', true);
$pdf->AddFont('DejaVu', 'I', 'DejaVuSansCondensed-Oblique.ttf', true);


// First page
$pdf->AddPage();

$pdf->SetFont('DejaVu','',22);
$text = "Astrological Natal Chart";
$pdf->Cell(0, 0, $text, 0, 1, C);

$pdf->Ln(10);

//main heading of report - title
$pdf->SetFont('DejaVu','',14);
$text = "Prepared for: " . $cIn['name'];
$pdf->Cell(0, 0, $text, 0, 1, C);

$pdf->Ln(8);

$pdf->SetFont('DejaVu','',12);
$text = $profile_birthdata;
$pdf->Cell(0, 0, $text, 0, 1, C);


$pdf->SetLeftMargin($left_margin);			 //if this isn't before the Ln(), then the next text margin is indented too far inward
$pdf->SetRightMargin($right_margin);		 //if this isn't before the Ln(), then the next text margin is indented too far inward
$pdf->Ln(16);


$server_name = strtolower($_SERVER['SERVER_NAME']);
$crlf = "\n";
if ($server_name == "localhost" Or $server_name == "zzee.php.gui") { $crlf = "\r\n"; }


// New page
$pdf->AddPage();
//display the chartwheel
$pdf->SetFont('DejaVu', '', 12);
$text = $profile_birthdata;
$pdf->Cell(0, 0, $text, 0, 1, C);

$pdf->Ln(6);

$filename = $_SESSION['chartwheel_filename'];
$x_axis_value = center_this_graphic_horizontally($filename, $width_of_pdf);
$pdf->Image($filename, $x_axis_value, NULL, 0, 0, '');


/* --------------------------------------
 * Rising
 * ------------------------------------ */
$pdf->AddPage();

if ($ubt1 == 0) {
	$pdf->SetFont('DejaVu', '', 18);
	$pdf->WriteHTML('<b>THE RISING SIGN OR ASCENDANT</b>');
	$pdf->Ln(11);
	$text = _astro('rising')['content'];
	$text = str_replace($crlf, "", $text);
	$pdf->SetFont('DejaVu', '', 10);
	print_justified_paragraphs($text, $pdf);

	$pdf->Ln(16);

	$pdf->SetFont('DejaVu', '', 18);
	$text = "<b>YOUR ASCENDANT IS: {$rising}</b>";
	$pdf->WriteHTML($text);
	$pdf->Ln(11);
	$string = _astro(trendCode('rising-'.$rising))['content'];
	$string = str_replace($crlf, "", $string);
	$pdf->SetFont('DejaVu', '', 12);
	print_justified_paragraphs($string, $pdf);
}

/* --------------------------------------
 * Sun
 * ------------------------------------ */
$pdf->AddPage();

$pdf->SetFont('DejaVu', '', 18);
$pdf->WriteHTML('<b>Sun sign</b>');
$pdf->Ln(8);
$text = _astro('sun')['content'];
$text = str_replace($crlf, "", $text);
$pdf->SetFont('DejaVu', '', 10);
print_justified_paragraphs($text, $pdf);

$pdf->Ln(16); // space

$s_pos = floor($hc1[1] / 30) + 1;
$rising = $sign_name[$s_pos];
$pdf->SetFont('DejaVu', '', 18);
$text = "<b>YOUR SUN SIGN IS: {$sunSign}</b>";
$pdf->WriteHTML($text);
$pdf->Ln(8);
$string = _astro(trendCode('sun-in-'.$sunSign))['content'];
$string = str_replace($crlf, "", $string);
$pdf->SetFont('DejaVu', '', 12);
print_justified_paragraphs($string, $pdf);


/* --------------------------------------
 * Moon
 * ------------------------------------ */
$pdf->AddPage();

$pdf->SetFont('DejaVu', '', 18);
$pdf->WriteHTML('<b>Moon sign</b>');
$pdf->Ln(11);
$text = _astro('moon')['content'];
$text = str_replace($crlf, "", $text);
$pdf->SetFont('DejaVu', '', 10);
print_justified_paragraphs($text, $pdf);

$pdf->Ln(16);

$s_pos = floor($hc1[1] / 30) + 1;
$rising = $sign_name[$s_pos];
$pdf->SetFont('DejaVu', '', 18);
$text = "<b>YOUR MOON SIGN IS: {$moonSign}</b>";
$pdf->WriteHTML($text);
$pdf->Ln(11);
$string = _astro(trendCode('moon-in-'.$moonSign))['content'];
$string = str_replace($crlf, "", $string);
$pdf->SetFont('DejaVu', '', 12);
print_justified_paragraphs($string, $pdf);

$pdf->Ln(16);

$s_pos = floor($hc1[1] / 30) + 1;
$rising = $sign_name[$s_pos];
$pdf->SetFont('DejaVu', '', 18);
$text = "<b>MOON {$moonSign} AND SUN {$sunSign}</b>";
$pdf->WriteHTML($text);
$pdf->Ln(11);
$string = _astro(trendCode('moon-'.$moonSign.'-sun-'.$sunSign))['content'];
$string = str_replace($crlf, "", $string);
$pdf->SetFont('DejaVu', '', 12);
print_justified_paragraphs($string, $pdf);


/* --------------------------------------
 * Midheaven
 * ------------------------------------ */


$pdf->Output();

?>
