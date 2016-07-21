<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    // Las variables $q_.. son las usadas en el query
    // obtenemos los datos enviados por el reproductor html
    @$q_id = $request->id;
    @$q_st = $request->state;

    //verificamos si esta cancion ya ue reproducida anteriormente
    if (!$enlace = mysql_connect('localhost', 'root', '')) {
        echo 'No pudo conectarse a mysql';
        exit;
    }
    if (!mysql_select_db('ia_data', $enlace)) {
        echo 'No pudo seleccionar la base de datos';
        exit;
    }

    $sql = 'UPDATE cancion SET stado = '.$q_st.' WHERE cancion.idCancion = '.$q_id;
    $resultado = mysql_query($sql, $enlace);

?>