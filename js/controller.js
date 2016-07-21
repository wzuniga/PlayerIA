var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $interval) {
    
    $scope.songs = [];
    $scope.test = "";
    $scope.volumen = 7;

    $scope.varInit = 0;
    $scope.percent = 0;
    $scope.state = true;

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
        //console.log(respuesta);
    });

    $http.post("php/obtenerCanciones.php", {
    }).success(function(respuesta){
        $scope.n_songs = respuesta;
            //console.log(respuesta);
            $scope.songPlaying(1);
    });

    //captar la cancion
    $scope.songPlaying = function(id){
        
        if($scope.varInit == 0){
            //console.log("nullooo");
            $scope.varInit = 1;
        }else{

            $scope.currentSong_old = $scope.currentSong;
            //console.log("Hey mama");
            /*$http.post("php/llenarDatos.php", {
                id: $scope.currentSong_old.id,
                volumen: $scope.volumen,
                porcentaje: $scope.percent
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
        
        //console.log($scope.n_songs.length);
        //$scope.songPlaying(1);
        //console.log($scope.currentSong.id);
        //console.log(angular.isDefined($scope.timer));
        if ($scope.state) {
            $interval.cancel($scope.timer);
            $scope.state = false;
        }else{
            $scope.timer = $interval( function(){ $scope.callAtInterval(); }, 1000);
            $scope.state = true;
        }
    }    
    
    $scope.next = function(){
        //console.log($scope.n_songs.length);
        if ( $scope.varInit == 0 ){
            console.log("No puedes avansar");
        }else{
            var song_id = parseInt($scope.currentSong.id)%$scope.n_songs.length;
            $scope.songPlaying(song_id+1);
            $scope.percent = 0;
            //console.log(parseInt($scope.currentSong.id));
        }
    }  

    $scope.prev = function(){
        //console.log($scope.n_songs.length);
        if ( $scope.varInit == 0 ){
            console.log("No puedes retoceder");
        }else{
            var id_current = parseInt($scope.currentSong.id);
            var song_id = (id_current==1)?$scope.n_songs.length+1:id_current;
            $scope.songPlaying(song_id-1);
            $scope.percent = 0;
            //console.log(parseInt($scope.currentSong.id));
        }
    }

    $scope.maxminVol = function(){
        if ($scope.volumen > 10 )
            $scope.volumen = 10;
        else if ($scope.volumen < 0)
            $scope.volumen = 0;
    }

    $scope.timer = $interval( function(){ $scope.callAtInterval(); }, 1000);
    
    $scope.callAtInterval = function() {
        if ( $scope.percent > 100 ){
            $scope.next();
            $scope.percent = 0;
        }
        $scope.percent++;
        //console.log("$scope.callAtInterval - Interval occurred");
    }
    
});