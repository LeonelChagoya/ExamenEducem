CREATE TABLE Usuarios (
    idusuario INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT (GETDATE()) not null,
    es_interno BIT NOT NULL
	UNIQUE (correo)
);
GO


CREATE TABLE Personal (
    idpersonal INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    apepaterno VARCHAR(255) NOT NULL,
    apematerno VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    fechadeingreso DATETIME DEFAULT (GETDATE()) not null,
);
GO

CREATE TABLE Notas (
    idnota INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    idpersonal INT FOREIGN KEY REFERENCES Personal(idpersonal) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_publicacion DATETIME DEFAULT (GETDATE()) not null
);
GO
CREATE TABLE Comentarios (
    idcomentario INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    idnota INT FOREIGN KEY REFERENCES Notas(idnota) NOT NULL,
    idusuario INT FOREIGN KEY REFERENCES Usuarios(idusuario) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_comentario DATETIME DEFAULT (GETDATE()) not null,
    es_interno BIT NOT NULL
);
GO
CREATE TABLE Respuestas (
    idrespuesta INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    idcomentario INT FOREIGN KEY REFERENCES Comentarios(idcomentario) NOT NULL,
    idusuario INT FOREIGN KEY REFERENCES Usuarios(idusuario) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_respuesta DATETIME DEFAULT (GETDATE()) not null,
    es_interno BIT NOT NULL
);

GO
