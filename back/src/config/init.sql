CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),
descripcion VARCHAR(255), likes INT);

INSERT INTO posts (titulo, img, descripcion) 
VALUES ('Test Post', 
'hhttps://cf.geekdo-images.com/s9oGMCo1fcfV4Dk3EnqLZw__itemrep/img/IRX2-uakhv7gHZPJNmtDbWFpjLg=/fit-in/246x300/filters:strip_icc()/pic3146943.png', 
'Descripción de prueba');