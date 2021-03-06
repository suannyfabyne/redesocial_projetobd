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

router.get('/criargrupo', function(req, res, next) {
  res.render('criargrupo', { title: 'Express' });
});

router.get('/grupo', function(req, res, next) {
  res.render('grupo', { title: 'Express' });
});

router.get('/listagrupos', function(req, res, next) {
  res.render('listagrupos', { title: 'Express' });
});

router.get('/listagruposwhereadmin', function(req, res, next) {
  res.render('listagruposwhereadmin', { title: 'Express' });
});

router.get('/listamembros', function(req, res, next) {
  res.render('listamembros', { title: 'Express' });
});

module.exports = router;
