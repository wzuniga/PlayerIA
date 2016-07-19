var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    
    $scope.songs = [];
    $scope.test = "";
    $scope.volumen = 7;

    $scope.varInit = 0;

    /*var arr = [{grupo : "Mana", name:"Mariposa Traicionera"},
               {grupo : "Mana", name:"Mi verdad"},
               {grupo : "Mana", name:"Labios compartidos"},
               {grupo : "Mana", name:"Oye mi Amor"},
               {grupo : "Mana", name:"En el muelle de San Blas"},
               {grupo : "Mana", name:"El verdadero amor perdona"},
               {grupo : "Mana", name:"Amor clandestino"}];

    var jsonArray = JSON.parse(JSON.stringify(arr));
    $scope.songs = jsonArray;*/
    
    $scope.currentSong = "2";
    
    $scope.sendSong = function(){
        $http.post("php/llenarDatos.php", {
            id: $scope.currentSong.id,
            volumen: "5",
            porcentaje: "90"
        }).success(function(respuesta){
            console.log(respuesta);
        });
    };
    
    $http.post("php/obtenerListaF.php", {
    }).success(function(respuesta){
        $scope.songs = respuesta;
            console.log(respuesta);
    });

    $http.post("php/obtenerCanciones.php", {
    }).success(function(respuesta){
        $scope.n_songs = respuesta;
            console.log(respuesta);
    });

    //captar la cancion
    $scope.songPlaying = function(id){
        
        if($scope.varInit == 0){
            console.log("nullooo");
            $scope.varInit = 1;
        }else{

            $scope.currentSong_old = $scope.currentSong;
            //console.log("Hey mama");
            /*$http.post("php/llenarDatos.php", {
                id: $scope.currentSong_old.id,
                volumen: "5",
                porcentaje: "90"
            }).success(function(respuesta){
                console.log(respuesta);
            });*/
        }

        
        $scope.currentSong = $scope.n_songs[parseInt(id)-1];
        //console.log($scope.currentSong_old);
        //console.log($scope.currentSong);
        //console.log(id);
    }

    $scope.play = function(){

        console.log($scope.n_songs.length);
        $scope.songPlaying(1);
        console.log($scope.currentSong.id);
    }    
    
    $scope.next = function(){
        //console.log($scope.n_songs.length);
        if ( $scope.varInit == 0 ){
            console.log("No puedes avansar");
        }else{
            $scope.songPlaying(parseInt($scope.currentSong.id));
            console.log(parseInt($scope.currentSong.id)+1);
        }
    }  

});