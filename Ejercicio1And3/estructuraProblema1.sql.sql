
/*. SQL 1.1) Describe brevemente el funcionamiento del JOIN en el lenguaje de consultas estructurado, los
tipos de JOIN's*/
/*Respusta: Join se usa para unir informacion de dos o mas tablas que esten relacionadas por medio de una llave foranea.
Inner Join: devuelve los valores donde la tabla A y la B coinsidan.
Left outer Join:cuando se quiere donde coinsidan A y B pero igual en donde no considan en la tabla A
Right outer Join: lo mismo que la anterior pero ahora se trae datos de A Y B pero que igual no coinsidan en B.
Full outer join: trae toda la informacion de A y B, tanto si coinsiden o no. 

*/

CREATE TABLE  miembros
    (id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
     miembro  VARCHAR (60) NOT NULL,
     edad INT  NOT NULL
	 )
GO

CREATE TABLE comida (
id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
nombre VARCHAR(60) not null
)
GO

CREATE TABLE comidaMiembros(
id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
idMiembro INT FOREIGN KEY REFERENCES miembros(id) NOT NULL,
idComida INT FOREIGN KEY REFERENCES comida(id) NOT NULL 
)
GO

INSERT INTO miembros(miembro, edad)
VALUES
('Papá',42),('Mamá',45),('Hija',19),('Hijo',16),('Perro',2);
GO

INSERT INTO comida(nombre)
VALUES
('Enchiladas'),('Sopa'),('Ensalada');
GO

INSERT INTO comidaMiembros(idMiembro,idComida)
VALUES (1,1),(4,2),(2,3);
 GO
/* 1.2). - Obtener todos los miembros de la familia que tengan una comida asignada 
(usa cualquier
tipo de JOIN)*/
SELECT  c.miembro, x.nombre
FROM miembros c
INNER JOIN comidaMiembros o ON c.id = o.idMiembro
INNER JOIN comida x ON x.id = o.idComida

GO
/**1.3). - Obtener todos los miembros de la familia con su respectiva comida asignada; incluir los
miembros que no tienen comida asignada (usa cualquier tipo de JOIN)**/
SELECT  c.miembro, x.nombre
FROM miembros c
LEFT JOIN comidaMiembros o ON c.id = o.idMiembro
LEFT JOIN comida x ON x.id = o.idComida


