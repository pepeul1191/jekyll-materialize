<?php

  if(isset($_GET['nombre']) && !empty($_GET['nombre'])) {
    echo 'nombre: ' . $_GET['nombre'] . '<br>';
  }
  $rpta = '';
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
