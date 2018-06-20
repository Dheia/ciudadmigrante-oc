<?php

/**
	prerender page for serach engines and social media using http://service.prerender.io

	to test go to: http://theyesbrand.com/prerender.php?url=equipo

 */
$token = '1YSrBVYk0ihDGSb04Vyc';


$url = 'http://'.$_SERVER['HTTP_HOST'].'/'.$_GET['url'];

// log
file_put_contents('./log_prerender.txt', date("Y-m-d H:i")." - ".$url." - ".$_SERVER['HTTP_USER_AGENT']."\n", FILE_APPEND);

$options = [
 	'http' => [
    	'header' => "X-Prerender-Token: ".$token."\r\n"
  	]
];
echo file_get_contents('http://service.prerender.io/'.$url, false, stream_context_create($options));
