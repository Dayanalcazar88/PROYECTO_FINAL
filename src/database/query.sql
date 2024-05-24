create database video_game;
use video_game;

create table personajes(
    id int auto_increment primary key,
    nombre varchar(50),
    apellido varchar(50),
    genero varchar(10),
    especie varchar(50),
    tipo varchar(50),
    caracteristicas varchar(100)
);
select * from personajes;

CREATE USER 'dayana'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON video_game.* TO 'dayana'@'localhost';
