<?php

  if(isset($_GET['nombre']) && !empty($_GET['nombre'])) {
    echo 'nombre: ' . $_GET['nombre'];
  }
