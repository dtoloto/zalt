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
    //console.log(req);
    var ref = firebase.database().ref("ZaltCard-Database");
    ref.child("Usuarios").once('value') //ref.child("chave aqui").once('value') para algo especifico
      .then(function(snap){
          console.log(snap.val());
          res.send(
              snap.val()
          );
      });
    // res.send(
    //     usuarios
    // );
    // var ref = firebase.database().ref("Sua tabela").child("sua tabela");
    // ref.on('value', function(snap) {
    // $scope.notifications = snap.val();


})

// Cria um endpoint com o método POST que consegue receber um body com informações
// enviadas pelo app ou site para serem processadas pelo servidor.
app.post('/usuarios', function(req, res) {
    // Criação da váriavel usuario para cadastrar no nosso vetor
    // req.body.nome é uma variavel enviada no corpo da requisição pelo usuário
    var erros = [];
    if (!req.body.nome) {
        erros.push("Nome não informado");
    }
    if (!req.body.senha) {
        erros.push("Senha não informada");
    }
    if (!req.body.cpf) {
        erros.push("CPF não informado");
    }

    //FUNÇÃO PARA VERIFICAR SE A SENHA CONTÉM CARACTERES ALPHANUMÉRICOS
    // var regex = new RegExp(/\D/, 'i');
    // if (regex.test(req.body.senha)) {
    //     erros.push("senha contém caracteres alphanuméricos");
    // }

    if (erros.length > 0) {
        res.send({
            status: false,
            erros: erros
        });
    } else {
        var usuario = {
                nome: req.body.nome,
                senha: req.body.senha,
                cpf: req.body.cpf,
                email: req.body.email,
                id: req.body.id,
                limite: req.body.limite,
                totalDisponivel: req.body.totalDisponivel,
                dependentes: {
                        {
                            nome: req.body.dependentes.nome,
                            senha: req.body.dependentes,
                            cpf: req.body.dependentes,
                            email: req.body.dependentes,
                            id: req.body.dependentes,
                            limite: req.body.dependentes,
                            totalDisponivel: req.body.dependentes,
                            statusCartao: req.body.dependentes,

                            recibos:{
                              {
                                categoria: req.body.dependentes,
                                nomeEstabelecimento: req.body.dependentes,
                                valor: req.body.dependentes,
                                data: req.body.dependentes
                              }
                            },

                            faturas:{},

                            estabelecimentos: {
                              {
                                categoria: req.body.dependentes,
                                status: req.body.dependentes
                              },
                            },
                        },

             }

            }
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
