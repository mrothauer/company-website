<?php
  // damit www.smart-websites.com/motorsagla.at nicht geht
  if(preg_match('/smart-websites\.com/', $_SERVER['HTTP_HOST'])) {
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: http://www.rothauer-it.com");
  }

	$environment = 'live';
	if (preg_match('/rothauer\-it\.dev/', $_SERVER['SERVER_NAME'])) {
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