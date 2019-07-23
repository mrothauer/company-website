<?php

	$environment = 'live';
	if (preg_match('/rothauer\-it\.test/', $_SERVER['SERVER_NAME'])) {
		$environment = 'dev';
	}

	$cssPath = 'css/';
	$jsPath = 'js/';
	
	$isErrorPage = false;
	if (isset($_GET['page']) && $_GET['page'] == '404') {
		header("HTTP/1.0 404 Not Found");
		$isErrorPage = true;		
	}

?>