var express = require('express');
var router = express.Router();
var connection = require('../db/connection');
var fs = require('fs');
var readline = require('readline');

/* GET home page. */



router.get('/clients', (req, res) =>{
 connection.query('SELECT * FROM clients', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      
      console.log('GET clients');
});});

    /* connection.query('SELECT originSentences.sentence AS sentence, translatedSentences.translatedSentence AS translatedSentence FROM originSentences JOIN translatedSentences ON translatedSentences._requestId_ = 350 AND originSentences._requestId = 350 AND translatedSentences.sentenceId = originSentences.sentenceId', function(error, results, fields){
          if(error) 
            res.json(error);
          else
            res.json(results);
          
          console.log('GET clients');*/


router.get('/originSentences', (req, res) =>{
 connection.query('SELECT * FROM originSentences', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);

      console.log('GET originSentences');
});});




router.get('/translationRequest', (req, res) =>{
 connection.query('SELECT * FROM translationRequest', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      
      console.log('GET translationRequest');
});});


router.get('/translationRequest/date', (req, res) =>{
 connection.query('SELECT DISTINCT requestDate FROM translationRequest', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      
      console.log('Request Date');
});});


router.get('/reviewtable', (req, res) =>{
 connection.query('SELECT * FROM reviewTable' , function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      
      console.log('GET joinSentences');
});});

router.get('/reviewtable/maxoperator/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE requestIdReview=' + parseInt(req.params.id);

 connection.query('SELECT requestIdReview, sentenceId, MAX(operator) as maxoperator, operator, OS, TS, modificationType FROM reviewTable' + filter + 
  ' group by sentenceId', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
        
      console.log('GET joinSentences');
});});

router.get('/reviewtable/maxreview/:id?', (req, res) =>{
    let filter = '';
    var lista = [];
    var contador = 0;
    var cont2 = 1;

    if(req.params.id) filter = ' WHERE requestIdReview=' + parseInt(req.params.id);

   connection.query('SELECT * FROM reviewTable' + filter + 
    ' group by sentenceId, operator DESC', function(error, results, fields){
      if(error) 
        res.json(error);
      else
        console.log(results[0].sentenceId);

        for (var i = 0; i < results.length; i++) {
            if (results[i].sentenceId == cont2){
              lista[contador] = results[i];
              contador++;
              cont2++;
            }
        }

        //console.log(lista);



        res.json(lista);
        
      console.log('GET joinSentences');
});});


router.get('/reviewtable/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE requestIdReview=' + parseInt(req.params.id);
    connection.query('SELECT * FROM reviewTable' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else{
        res.json(results);
      }
      
      console.log('GET id Sentence review table');
});});



router.get('/reviewtable/:id?/:id2?/:id3?', (req, res) =>{
    let filter = '';
    if(req.params.id && req.params.id2 && req.params.id3) filter = ' WHERE requestIdReview=' + parseInt(req.params.id) + ' AND sentenceId=' + parseInt(req.params.id2) + ' AND operator=' + parseInt(req.params.id3);
    connection.query('SELECT * FROM reviewTable' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else{
        res.json(results);
      }
      
      console.log('GET id review table');
});});

router.get('/reviewtablea/:id?/:id2?', (req, res) =>{
    let filter = '';
    if(req.params.id && req.params.id2) filter = ' WHERE requestIdReview=' + parseInt(req.params.id) + ' AND sentenceId=' + parseInt(req.params.id2);
    connection.query('SELECT * FROM reviewTable' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else{
        res.json(results);

      }
      
      console.log('GET id review table id and idsentence');
});});


router.post('/reviewtable', (req, res) =>{
    let filter = '';
    console.log(req.body.TS + ' ' + req.body.requestIdReview + ' ' + req.body.sentenceId + ' ' + req.body.operator);
    console.log('AAAAAAAAAAAAAAAA');

    if(req.body.requestIdReview && req.body.sentenceId && req.body.operator) filter = ' WHERE requestIdReview=' + parseInt(req.body.requestIdReview) + ' AND sentenceId=' + parseInt(req.body.sentenceId);
    else console.log("erro");
    connection.query('SELECT * FROM reviewTable' + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else {
        res.json(results);
        var date = new Date();
        var values = [
        [results[results.length-1].requestIdReview, results[results.length-1].sentenceId, date, results[results.length-1].operator + 1, results[results.length-1].TS, req.body.TS, 'Revisado'],
        ];
      }

        var sqlreview = "INSERT INTO reviewTable (requestIdReview, sentenceId, dateReview, operator, OS, TS, modificationType) VALUES ?";
      connection.query(sqlreview, [values] , function (err, result,fields) {
        if (err) throw err;
        console.log("INDICE DO REQUEST: " + result.insertId);
        console.log('POST review table')

        
        })

});});


/*    var txt = function() {
        var directory = 'sinais.txt'; 
        var rd = readline.createInterface({
            input: fs.createReadStream(directory),
            output: process.stdout,
            console: false
        });

        var sign = [];
        var timesign = [];

        rd.on('line', function(line) {
          //console.log(line);

          sign = line.split('  ');
          sign = sign.toString().split(' ');

            var secondsql = "INSERT INTO signs (sign, timesign) VALUES ?";
            var secondvalues = [
            [sign[0], sign[1]], 
            ];

            connection.query(secondsql, [secondvalues] , function (err, result) {
                if (err) throw err;
                console.log('NEW SIGN INTO SIGNS');
            });

        });



    }

    txt();*/

router.get('/sinais/:token', (req, res) =>{

    let filter = '';

    var token = req.params.token;

    console.log(token.toUpperCase());
        console.log('AAAAAAAA');

    if(req.params.token) filter = " WHERE sign='" + token.toUpperCase() + "\t'";
    connection.query("SELECT * FROM `signs`" + filter, function(error, results, fields){
      if(error) 
        res.json(error);
      else{

        res.json(results);

      }
      
      console.log('GET signs');

});

/*
            var secondsql = "INSERT INTO signs (sign, timesign) VALUES ?";
            var secondvalues = [
            ['oi', 123], 
            ];

            console.log(i);

            connection.query(secondsql, [secondvalues] , function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted ORIGINAL: " + i + " - " + result.affectedRows );
            });
*/


});





module.exports = router;
