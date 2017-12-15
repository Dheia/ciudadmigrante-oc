<?php

// [REDIRECT_SCRIPT_URL] => /espacio/2
// echo '<pre>'; print_r($_SERVER);
// $url == 'http://ciudadmigrante.org/admin/espacio/2/metadata'
$url = 'http://'.$_SERVER['HTTP_HOST'].'/admin/api'.($_SERVER[REDIRECT_SCRIPT_URL]=='/'?'':$_SERVER[REDIRECT_SCRIPT_URL]).'/metadata';
// echo $url; exit;
// echo file_get_contents($url);

$ch = curl_init();
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
$contents = curl_exec($ch);
if (curl_errno($ch)) {
	echo curl_error($ch);
	echo "\n<br />";
	$contents = '';
} else {
	curl_close($ch);
}

if (!is_string($contents) || !strlen($contents)) {
	echo "Failed to get contents.";
	$contents = '';
}
echo $contents;
