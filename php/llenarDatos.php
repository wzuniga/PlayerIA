<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    // Las variables $q_.. son las usadas en el query
    // obtenemos los datos enviados por el reproductor html
    @$q_id = $request->id;
    @$q_vol = $request->volumen;
    @$q_por = $request->porcentaje;

    // Generamos las variables contenedoras de las fechas
    $c_date = getdate();

    $q_dia = $c_date['mday']-1;
    $q_mes = $c_date['mon'];
    $q_anho = $c_date['year'];

    //verificamos si esta cancion ya ue reproducida anteriormente
    if (!$enlace = mysql_connect('localhost', 'root', '')) {
        echo 'No pudo conectarse a mysql';
        exit;
    }
    if (!mysql_select_db('ia_data', $enlace)) {
        echo 'No pudo seleccionar la base de datos';
        exit;
    }

    $sql = 'SELECT * FROM reproduccion WHERE dia = '.$q_dia.' AND mes = '.$q_mes.' AND anho = '.$q_anho.' AND Cancion_idCancion = '.$q_id;
    $resultado = mysql_query($sql, $enlace);
    $num = mysql_num_rows($resultado);
    echo $sql;

    if ($num == 0){
        $sql = 'SELECT idReproduccion FROM reproduccion ORDER BY idReproduccion DESC LIMIT 1';
        $resultado = mysql_query($sql, $enlace);
        $num_id = mysql_fetch_assoc($resultado)['idReproduccion']+1;

        $sql = 'INSERT INTO reproduccion (idReproduccion,dia,mes,anho,cant_reproduccion,porc_reproduccion,volumen,Cancion_idCancion) VALUES ('.$num_id.','.$q_dia.','.$q_mes.','.$q_anho.',1,'.$q_por.','.$q_vol.','.$q_id.')';
        $resultado = mysql_query($sql, $enlace);
        //echo $sql;
    }else{
        $var_row = mysql_fetch_assoc($resultado);
        $current_id = $var_row['idReproduccion'];
        $current_rep = $var_row['cant_reproduccion']+1;
        echo $current_rep;
        $sql = 'UPDATE reproduccion SET cant_reproduccion = '.$current_rep.' WHERE idReproduccion = '.$current_id;
        $resultado = mysql_query($sql, $enlace);
        //echo $sql;
    }

    /*if (!$resultado) {
        echo "Error de BD, no se pudo consultar la base de datos\n";
        echo "Error MySQL: " . mysql_error();
        exit;
    }

    while ($fila = mysql_fetch_assoc($resultado)) {
        echo $fila['dia'];
    }*/
?>