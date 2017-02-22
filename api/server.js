// Importação da biblioteca do express para dentro do nosso código
var express = require('express');

// Biblioteca que possibilita/libera o acesso
// a api por servidores externos
var cors = require('cors')
var firebase = require("firebase");

firebase.initializeApp({
    databaseURL: "https://zalt-card.firebaseio.com/",
});

var app = express();
app.use(cors())

// Biblioteca que possibilita a extração dos parâmetros enviados pelo app/website
// via body no formato json
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded

// Vetor de usuarios
var usuarios = [];
// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("ZaltCard-Database");//NOME DO BANCO DE DADOS QUE ELE CRIA

var usuariosRef = ref.child("Usuarios");


// Cria um endpoint(URL) com o metodo get que geralmente é usado para
// listar ou retornar informação
// Essa Url estará acessivel no endereço http://localhost:3000/usuarios
app.get('/usuarios', function(req, res) {
    // console.log(req);
    var ref = firebase.database().ref("ZaltCard-Database");
    ref.child("Usuarios").orderByChild('cpf').equalTo(req.query.cpf).once('value') //ref.child("chave aqui").once('value') para algo especifico
      .then(function(snap){
          console.log(snap.val());
          res.send(
              snap.val()
          );
      });
})

//
app.get('/dependente', function(req, res) {
    // console.log(req);

    // var ref = firebase.database().ref("ZaltCard-Database");
    // ref.child("Usuarios").orderByChild('dependentes/cpf').equalTo(req.query.cpf).once('value')

    var ref = firebase.database().ref("ZaltCard-Database");
    ref.child("Usuarios").orderByChild('cpf').equalTo(req.query.cpf).once('value') //ref.child("chave aqui").once('value') para algo especifico
      .then(function(snap){
          console.log(snap.val());
          res.send(
              snap.val()
          );
      });


})


// //POST ATUALIZAR STATUS CARTAO: BLOQUEADO/DESBLOQUEADO
app.post('/bloqueiaCartao', function writeNewPost(req, res) {


        var statusCartao = false;
        var update = [];
        update['/ZaltCard-Database/Usuarios/-KdWYFHb72Rp9_S7s6qu/dependentes/0/statusCartao'] = statusCartao;

        res.send({
            status: true,
            updates: update,
            statusCartao: req.body
        });



  return firebase.database().ref().update(updates);
})


// Cria um endpoint com o método POST que consegue receber um body com informações
// enviadas pelo app ou site para serem processadas pelo servidor.
app.post('/usuarios', function(req, res) {
    // Criação da váriavel usuario para cadastrar no nosso vetor
    // req.body.nome é uma variavel enviada no corpo da requisição pelo usuário

    console.log(req);


    if (erros.length > 0) {
        res.send({
            status: false,
            erros: erros
        });
    } else {
        var usuario = req.body;
            // Grava o usuário no servidor
        usuariosRef.push(usuario);

        // Devolve uma resposta para o app ou site que esta fazendo a requisição
        res.send({
            status: true,
            usuarios: usuario
        });
    }

    //console.log(req.body);
});

// Inicia o servidor
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
