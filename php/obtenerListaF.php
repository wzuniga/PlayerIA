<?php

    //nos conectamos a la base de datos
    if (!$enlace = mysql_connect('localhost', 'root', '')) {
        echo 'No pudo conectarse a mysql';
        exit;
    }
    if (!mysql_select_db('ia_data', $enlace)) {
        echo 'No pudo seleccionar la base de datos';
        exit;
    }

    $sql = 'DROP TABLE listname';
    mysql_query($sql, $enlace);
    $sql = 'CREATE TABLE listName SELECT listafavoritos.idLista, cancion.idCancion, cancion.nombre FROM cancion INNER JOIN listafavoritos on listafavoritos.Cancion_idCancion = cancion.idCancion';
    mysql_query($sql, $enlace);
    $sql = 'SELECT * FROM listname ORDER BY listname.idLista DESC LIMIT 10';
    $resultado = mysql_query($sql, $enlace);

    if (!$resultado) {
        echo "Error de BD, no se pudo consultar la base de datos\n";
        echo "Error MySQL: " . mysql_error();
        exit;
    }
    $vals = array();

    $fila = mysql_fetch_assoc($resultado);
    for ($i=9; $i >= 0 ; $i--) { 
        $vals[$i] = array('id'=>$fila['idCancion'],'name'=>$fila['nombre']);
        $fila = mysql_fetch_assoc($resultado);
    }
    
    //var_dump($vals);

    echo json_encode($vals);

    //while ($fila = mysql_fetch_assoc($resultado)) {
    //    echo $fila['nombre'];
    //}

?>
