create database video_game;
use video_game;

create table personajes(
    id int auto_increment primary key,
    NAME varchar(50),
    LAST_NAME varchar(50),
    GENDER varchar(10),
    SPECIES varchar(50),
    CHARACTER_TYPE varchar(50),
    CHARACTERISTICS varchar(100),
    urls varchar(50)
);
select * from personajes;

CREATE USER 'dayana'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON video_game.* TO 'dayana'@'localhost';
