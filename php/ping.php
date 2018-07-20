<?php

  ini_set('display_errors',1);

  header('x-powered-by: PHP');
  header('Server: Ubuntu');
  header("Access-Control-Allow-Origin: http://localhost:4000");
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  header('Content-type: text/html; charset=UTF-8');

  if(isset($_GET['nombre']) && !empty($_GET['nombre'])) {
    echo 'nombre: ' . $_GET['nombre'] . '<br>';
  }
  $rpta = '';
  $url = $_SERVER['REQUEST_URI'];
  $parts = parse_url($url);
  $path = $parts['path'];
  $path = explode('/', $path);
  var_dump($url);
  var_dump($path);
  var_dump(end($path));
  try {
    $config = require 'config.php';
    $db = call_user_func($config['db']);
    $stmt = $db->prepare('SELECT * FROM sedes');
  	$stmt->execute();
  	$rpta = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "XD";
  }catch (Exception $e) {
    $rpta = array(
      'tipo_mensaje' => 'error',
      'mensaje' => array('Se ha producido un error en verificar el correo ingresado',
        $e->getMessage()
      )
    );
  }
	echo json_encode($rpta);
