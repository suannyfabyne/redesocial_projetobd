var express = require('express');
var router = express.Router();
var connection = require('../db/connection');


router.post('/ExcluirResposta', (req, res) =>{


         sql3 = "DELETE FROM Respostas WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem + " AND codRespostas=" + req.body.codRespostas;
          connection.query(sql3, function (err, result,fields) {
          if (err) throw err;
        });


       
});

router.post('/ExcluirComentario', (req, res) =>{


         sql2 = "DELETE FROM Respostas WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem + " AND codComentarios=" + req.body.codComentarios;
        console.log(sql2);

        connection.query(sql2, function (err, result,fields) {
          if (err) throw err;
        });


         sql3 = "DELETE FROM Comentarios WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem + " AND codComentarios=" + req.body.codComentarios;
          connection.query(sql3, function (err, result,fields) {
          if (err) throw err;
        });


       
});


router.post('/ExcluirPost', (req, res) =>{

        var sql = "DELETE FROM Respostas WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem;;
        console.log(sql);

        connection.query(sql, function (err, result,fields) {
          if (err) throw err;
        });


         sql2 = "DELETE FROM Comentarios WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem;
         sql3 = "DELETE FROM Postagens WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem;
          connection.query(sql2, function (err, result,fields) {
          if (err) throw err;
        });
        connection.query(sql3, function (err, result,fields) {
          if (err) throw err;
        });

       
});


router.post('/MudarPrivacidade', (req, res) =>{

    console.log(req.body.id_amigo + ' ' + req.body.idUser );
        var sql = "UPDATE Postagens SET privacidade='" + req.body.select +"' WHERE codMurais=" + req.body.codMural + " AND codPostagens=" + req.body.codPostagem;
        console.log(sql);

        connection.query(sql, function (err, result,fields) {
          if (err) throw err;
        });

});


router.get('/checkAmigo/:codUser/:id_amigo', (req, res) =>{

        if(req.params.codUser) filter = " AND (Amizades.codUserAmigo=" + req.params.codUser + " OR Amizades.codUser=" + req.params.codUser + ") AND (Amizades.codUserAmigo=" + req.params.id_amigo + " OR Amizades.codUser=" + req.params.id_amigo + ") AND statusAmizade='aceito'";
      connection.query("SELECT * FROM Usuarios JOIN Amizades ON Usuarios.codUser = Amizades.codUser WHERE statusAmizade='aceito'" + filter, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        });

});

router.get('/amigos/:codUser', (req, res) =>{

        if(req.params.codUser) filter = " AND (Amizades.codUserAmigo=" + req.params.codUser + " OR Amizades.codUser=" + req.params.codUser + ")";
      connection.query("SELECT * FROM Usuarios INNER JOIN Amizades ON Usuarios.codUser = Amizades.codUser WHERE statusAmizade='aceito'" + filter, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
          console.log(results + 'AAAA')
        console.log('GET solicitacoes');
        });

});

router.post('/rejeitaramizade', (req, res) =>{

    console.log(req.body.id_amigo + ' ' + req.body.idUser );
        var sql = "DELETE FROM Amizades WHERE (codUser=" + req.body.id_amigo + " AND codUserAmigo=" + req.body.idUser + ") OR (codUser=" + req.body.idUser + " AND codUserAmigo=" + req.body.id_amigo + ")";
        console.log(sql);

        connection.query(sql, function (err, result,fields) {
          if (err) throw err;
        });

});

router.post('/aceitaramizade', (req, res) =>{

    console.log(req.body.id_amigo + ' ' + req.body.idUser );
        var sql = "UPDATE Amizades SET statusAmizade='aceito' WHERE codUser=" + req.body.id_amigo + " AND codUserAmigo=" + req.body.idUser;
        console.log(sql);

        connection.query(sql, function (err, result,fields) {
          if (err) throw err;
        });

});


router.get('/respostas/:codMurais', (req, res) =>{

let filter = '';
    if(req.params.codMurais) filter = " WHERE Respostas.codMurais=" + req.params.codMurais;


 connection.query('SELECT Usuarios.codUser, Usuarios.nomeUser, Usuarios.fotoUser, Respostas.codRespostas, Respostas.codMurais, Respostas.codPostagens, Respostas.codComentarios, Respostas.resposta FROM Usuarios INNER JOIN Respostas ON Usuarios.codUser=Respostas.codUserRespostas ' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
        console.log(results + "AAAAAAaa");
      console.log('GET respostas');
});});

router.post('/responder', (req, res) =>{

    console.log(req.body.resposta + req.body.codComentarios	+ ' ' + req.body.codUserPostagens + ' ' + req.body.idMural + ' ' + req.body.idpost + "XXXX" + req.body.codUserComentarios + ' ' + req.body.codUserRespostas);

		var date = new Date();
        var values = [
        [req.body.resposta, req.body.codComentarios, req.body.idpost,req.body.codUserPostagens, req.body.idMural, req.body.codUserComentarios, req.body.codUserRespostas],
        ];
        console.log(values)
        var sql = "INSERT INTO Respostas (resposta, codComentarios, codPostagens, codUserPostagens, codMurais, codUserComentarios, codUserRespostas) VALUES ?";

        connection.query(sql, [values] , function (err, result,fields) {
          if (err) throw err;
        });
});


router.post('/comentar', (req, res) =>{

    console.log(req.body.comentario + ' ' + req.body.idUserPostagens + ' ' + req.body.idMural + ' ' + req.body.idpost + "XXXX" + req.body.codUserComentarios);

		var date = new Date();

        var values = [
        [req.body.comentario, req.body.idpost, req.body.codUserPostagens, req.body.idMural, req.body.codUserComentarios],
        ];

        var sql = "INSERT INTO Comentarios (comentario, codPostagens, codUserPostagens, codMurais, codUserComentarios) VALUES ?";

        connection.query(sql, [values] , function (err, result,fields) {
          if (err) throw err;
        });
});

router.get('/comentarios/:codMurais', (req, res) =>{

let filter = '';
    if(req.params.codMurais) filter = " WHERE Comentarios.codMurais=" + req.params.codMurais;


 connection.query('SELECT Usuarios.codUser, Usuarios.nomeUser, Usuarios.fotoUser, Comentarios.comentario, Comentarios.codMurais, Comentarios.codPostagens, Comentarios.codComentarios FROM Usuarios INNER JOIN Comentarios ON Usuarios.codUser=Comentarios.codUserComentarios' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
        console.log(results + "AAAAAAaa");
      console.log('GET comentarios');
});});



router.get('/amizaderequests/:codUser', (req, res) =>{

    		if(req.params.codUser) filter = " AND Amizades.codUserAmigo=" + req.params.codUser;
	 		connection.query("SELECT * FROM Usuarios JOIN Amizades ON Usuarios.codUser = Amizades.codUser WHERE statusAmizade='pendente'" + filter, function(error, results, fields){
	      if(error) 
	        res.json(error);
	      else
	        res.json(results);
	      	console.log(results + 'AAAA')
	      console.log('GET solicitacoes');
	      });

});


router.get('/amizaderequestsBYME/:codUser', (req, res) =>{

    		if(req.params.codUser) filter = " AND Amizades.codUser=" + req.params.codUser;
	 		connection.query("SELECT * FROM Usuarios JOIN Amizades ON Usuarios.codUser = Amizades.codUserAmigo WHERE statusAmizade='pendente'" + filter, function(error, results, fields){
	      if(error) 
	        res.json(error);
	      else
	        res.json(results);
	      
	      console.log('GET solicitacoesBYME');
	      });


});

router.post('/amizade', (req, res) =>{

    console.log(req.body.id_amigo + ' ' + req.body.idUser );
        data = new Date();
        var status = 'pendente'
        console.log(data);
        var values = [

        [req.body.idUser,req.body.id_amigo, status],
        ];
        var sql = "INSERT INTO Amizades (codUser, codUserAmigo, statusAmizade) VALUES ?";

        connection.query(sql, [values] , function (err, result,fields) {
          if (err) throw err;
        });

});

router.post('/postar', (req, res) =>{

    console.log(req.body.post + ' ' + req.body.idUser + ' ' + req.body.idMural);
		var data = new Date();
		
        var values = [
        [req.body.post,req.body.idUser, req.body.idMural, data.getDay(), req.body.select, req.body.url2],
        ];
        var sql = "INSERT INTO Postagens (post, codUser, codMurais, datapost, privacidade, urlimagepost) VALUES ?";

        connection.query(sql, [values] , function (err, result,fields) {
          if (err) throw err;
        });

});

router.get('/posts/:codMurais', (req, res) =>{

let filter = '';
    if(req.params.codMurais) filter = " WHERE Postagens.codMurais=" + req.params.codMurais;


 connection.query('SELECT Usuarios.codUser, Usuarios.nomeUser, Usuarios.fotoUser, Postagens.post, Postagens.datapost, Postagens.codMurais, Postagens.codPostagens, Postagens.privacidade, Postagens.urlimagepost FROM Usuarios INNER JOIN Postagens ON Usuarios.codUser=Postagens.codUser ' + filter + ' order by Postagens.codPostagens DESC', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
        console.log(results + "AAAAAAaa");
      console.log('GET posts');
});});


router.get('/usuarios', (req, res) =>{

 connection.query('SELECT * FROM Usuarios', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      
      console.log('GET usuarios');
});});

router.get('/usuarios/:idUser', (req, res) =>{

 let filter = '';
    if(req.params.idUser) filter = " ON Usuarios.codUser=" + req.params.idUser + " AND Murais.codUser =" + req.params.idUser;

 connection.query('SELECT Usuarios.nomeUser, Usuarios.nascUser, Usuarios.cidadeUser, Usuarios.emailUser, Usuarios.generoUser, Usuarios.nascUser, Usuarios.codUser, Usuarios.fotoUser, Murais.codMurais, Usuarios.relacionamentoUser FROM Usuarios INNER JOIN Murais' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
        console.log(results + "OIIIIIIII");

      console.log('GET usuarios');
});});


router.get('/grupos', (req, res) =>{
 connection.query('SELECT * FROM Grupos', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      
      console.log('GET clients');
});});

router.post('/cadastrar', (req, res) =>{

    console.log(req.body.nome + ' ' + req.body.email);

        var values = [
        [req.body.email,req.body.nome, req.body.senha, req.body.data, req.body.genero, req.body.status, req.body.cidade, req.body.url],
        ];
      	

        var sqlreview = "INSERT INTO Usuarios (emailUser, nomeUser, senhaUser, nascUser, generoUser, relacionamentoUser,cidadeUser, fotoUser) VALUES ?";

      	connection.query(sqlreview, [values] , function (err, result,fields) {
	        if (err) throw err;

          console.log(result.insertId);
          var values = [
            [result.insertId],
          ]

          var sqlreviewmurais = "SELECT * from Usuarios WHERE codUser= " + result.insertId;

          connection.query(sqlreviewmurais, function (err, result,fields) {
          if (err) throw err;
          console.log(result[0].codUser)
          
          var values = [
          [result[0].codUser],
          ];

          var sqlreviewmurais2 = "INSERT INTO Murais (codUser) VALUES ?";        
              connection.query(sqlreviewmurais2, [values], function (err, result,fields) {
              if (err) throw err;

            })  
          
         });
		});
        
});

router.get('/login/:email/:senha', (req, res) =>{

    let filter = '';
    if(req.params.email && req.params.senha) filter = " WHERE emailUser='" + req.params.email + "' AND senhaUser='" + req.params.senha + "'";
    console.log(req.params.email + ' ' + req.params.senha)

 connection.query("SELECT * FROM Usuarios" + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
    	console.log(results);

});});



module.exports = router;
