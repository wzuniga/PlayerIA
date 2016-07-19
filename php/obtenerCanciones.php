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

    $sql = 'SELECT C.idCancion, C.nombre, G.nombre_genero, A.nombre AS aut, L.nombre AS alb FROM cancion C INNER JOIN genero G INNER JOIN artista A INNER JOIN album L ON C.idGenero = G.idGenero AND C.idArtista = A.idArtista AND C.idAlbum = L.idAlbum';
    $resultado = mysql_query($sql, $enlace);

    if (!$resultado) {
        echo "Error de BD, no se pudo consultar la base de datos\n";
        echo "Error MySQL: " . mysql_error();
        exit;
    }
    $vals = array();
    $num = mysql_num_rows($resultado);
    $fila = mysql_fetch_assoc($resultado);
    
    for ($i=0; $i < $num ; $i++) { 
        $vals[$i] = array('id'=>$fila['idCancion'],'name'=>$fila['nombre'],'genero'=>$fila['nombre_genero'],'album'=>$fila['alb'],'autor'=>$fila['aut']);
        $fila = mysql_fetch_assoc($resultado);
    }

    echo json_encode($vals);
?>