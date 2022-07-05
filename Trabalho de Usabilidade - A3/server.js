//requires
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var path = require("path");
const { application } = require('express');
const { query } = require('express');
const sqlite3 = require('sqlite3');
//banco de dados
var db = new sqlite3.Database('./database/Usuarios.db');

var informacao;

app.get('/', (req, res) =>{ 
res.render('index.ejs');
})

app.get('/home.ejs', (req, res) =>{
    res.render('home.ejs');    
})

app.get('/sobrenos.ejs', (req, res) =>{
    res.render('sobrenos.ejs');    
})

app.get('/atendimento.ejs', (req, res) =>{
    res.render('atendimento.ejs');    
})

app.get('/cadastro.ejs', (req, res) =>{
    res.render('cadastro.ejs');    
})

app.get('/login.ejs', (req, res) =>{
    res.render('login.ejs');    
})

app.get('/usuario.ejs', (req, res) =>{
    res.render('usuario.ejs');    
})

app.get('/senha.ejs', (req, res) =>{
    res.render('senha.ejs');    
})

app.get('/agendar.ejs', (req, res) =>{
    res.render('agendar.ejs');    
})

app.get('/visualizar.ejs', (req, res) =>{
    res.render('visualizar.ejs');    
})

app.use('/css', express.static('css')); //Aqui fica a comunicação com o CSS
app.use('/img', express.static('img')); //comunica com a pasta de imagens

//database
app.use(bodyParser.urlencoded({extended: false}));

app.post('/cadastrar', function(req,res){
    db.serialize(() => {
        db.run(
            'INSERT INTO Login(nome,email,nascimento,endereco,telefone,senha,estado)VALUES(?,?,?,?,?,?,?)',
            [req.body.nome,req.body.email,req.body.nascimento,req.body.endereco,req.body.telefone,req.body.senha,req.body.estado], 
            function(err){
                if(err){
                    return console.log(err.message);
                }
                else{
                    res.redirect('/atendimento.ejs');
                }
            }
        ); 
    });
});

app.post('/logar', function(req,res){
    db.serialize(() =>{
        db.each('SELECT * FROM Login WHERE email=? AND senha=?',
            [req.body.email,req.body.senha],
            function(err, rows) {
                if(err){
                    return console.error(err.message);
                }
                else{
                    informacao=req.body.email;
                    res.redirect('usuario.ejs');
                }
            }
        );
    });
});

app.post('/new_pswd', function(req,res){
    db.serialize(() => {
        db.run('UPDATE Login SET senha=? WHERE email=? and telefone=?',
            [req.body.novasenha,req.body.email,req.body.telefone], 
            function(err){
                if(err){
                    return console.log(err.message);
                }
                res.redirect('/login.ejs');
            }
        );
        
    });
});

app.post('/agendar', function(req,res){
    db.serialize(() => {
        db.run('INSERT INTO Agendamento (dia,horario,profissional) VALUES(?,?,?)',
            [req.body.dia,req.body.horario,req.body.profissional],
            function(err){
                if(err){
                    return console.log(err.message);
                }else{
                    db.run('UPDATE Agendamento SET email =? WHERE dia=? and horario=? and profissional=?',
                    [informacao,req.body.dia,req.body.horario,req.body.profissional],
                    function(err){
                        if(err){
                            return console.log(err.message);
                        }
                        else{
                            res.redirect('/usuario.ejs');
                        }
                    }
                    );
                }
            }
        );
    });
});

app.post('/ver', function(req,res){
    db.serialize(() =>{
        db.each('SELECT * FROM Agendamento WHERE email=?',
            [informacao],
            function(err, rows) {
                if(err){
                    return console.error(err.message);
                }
                res.send('<p>Dia:'+ rows.dia + '</p>' + 
                        '<p>Horário:' + rows.horario + '</p>' +
                        '<p>Profissional:'+ rows.profissional + '</p>');
            }
        );
    });
});

app.listen(3000, function () {
    console.log("Servidor na porta 3000!");
})

app.set('view engine','ejs');