var sqlite3 = require('sqlite3').verbose();

//criar banco
var db = new sqlite3.Database('./database/Usuarios.db')

//criando tabela para cadastro de usuarios
db.run("CREATE TABLE IF NOT EXISTS Login(" +
    "nome VARCHAR(100) NOT NULL," +
    "email TEXT(100) NOT NULL," +
    "nascimento INT NOT NULL," +
    "endereco VARCHAR(100) NOT NULL," +
    "telefone INT(11) NOT NULL," +
    "estado VARCHAR(25) NOT NULL," +
    "senha VARCHAR NOT NULL)" 
);
console.log("tabela criada!");
db.run("CREATE TABLE IF NOT EXISTS Agendamento(" +
    "dia VARCHAR(100)," +
    "horario VARCHAR(100)," +
    "profissional VARCHAR(100)," +
    "email TEXT(100))" 
);
console.log("tabela 2 criada!");