<?php

return [
  'db' =>  function(){
    $db = new PDO('sqlite:../db/coa.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
  }
];
