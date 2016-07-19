select reproduccion.idReproduccion ,cancion.nombre from cancion INNER join reproduccion on reproduccion.Cancion_idCancion = cancion.idCancion

select * from listafavoritos

SELECT listafavoritos.Cancion_idCancion, cancion.nombre FROM cancion (ORDER BY listafavoritos.idLista DESC LIMIT 10) INNER JOIN listafavoritos on listafavoritos.Cancion_idCancion = cancion.idCancion

INSERT INTO listafavoritos VALUES('10','11','11')

select * from listafavoritos Last rows 8

SELECT * FROM (CREATE TEMPORARY TABLE tab1 SELECT * FROM listafavoritos ORDER BY listafavoritos.idLista DESC LIMIT 10)

DROP TABLE listname;
CREATE TABLE listName SELECT listafavoritos.idLista, cancion.idCancion, cancion.nombre FROM cancion INNER JOIN listafavoritos on listafavoritos.Cancion_idCancion = cancion.idCancion;
SELECT * FROM listname ORDER BY listname.idLista DESC LIMIT 10;

SELECT * FROM reproduccion WHERE dia = 1 AND mes = 6 AND anho = 2016

SELECT * FROM reproduccion WHERE dia = 13 AND mes = 7 AND anho = 2016

SELECT idReproduccion FROM reproduccion ORDER BY idReproduccion DESC LIMIT 1;

SELECT * FROM reproduccion WHERE idReproduccion = 106
UPDATE reproduccion SET cant_reproduccion = 2 WHERE idReproduccion = 106;
INSERT INTO reproduccion (idReproduccion,dia,mes,anho,cant_reproduccion,porc_reproduccion,volumen,Cancion_idCancion) VALUES (106,1,1,1,1,1,1,1)

DELETE FROM reproduccion WHERE idReproduccion  = 106

CREATE TABLE fullSong SELECT cancion.idCancion, cancion.nombre, album.nombre, artista.nombre, genero.nombre_genero FROM cancion, album, genero AS
CREATE TABLE songGenero SELECT cancion.idCancion, cancion.nombre, genero.nombre_genero FROM genero G INNER JOIN 

SELECT C.idCancion, C.nombre, G.nombre_genero, A.nombre AS aut, L.nombre AS alb FROM cancion C INNER JOIN genero G INNER JOIN artista A INNER JOIN album L ON C.idGenero = G.idGenero AND C.idArtista = A.idArtista AND C.idAlbum = L.idAlbum

SELECT * FROM reproduccion

DELETE FROM reproduccion WHERE idReproduccion > 105
SELECT * FROM reproduccion WHERE dia = 13 AND mes = 7 AND anho = 2016 AND Cancion_idCancion = 2