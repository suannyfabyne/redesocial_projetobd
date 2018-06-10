var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/mural', function(req, res, next) {
  res.render('mural', { title: 'Express' });
});

router.get('/usuarios', function(req, res, next) {
  res.render('usuarios', { title: 'Express' });
});

router.get('/solicitacoes', function(req, res, next) {
  res.render('solicitacoes', { title: 'Express' });
});

router.get('/amigo', function(req, res, next) {
  res.render('amigo', { title: 'Express' });
});

router.get('/listaamigos', function(req, res, next) {
  res.render('listaamigos', { title: 'Express' });
});


module.exports = router;
