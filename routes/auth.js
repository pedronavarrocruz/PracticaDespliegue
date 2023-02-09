const express = require('express');
const session = require('express-session');

let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth_login');
});

router.post('/login', (req, res) => {
let login = req.body.login;
let password = req.body.password;

let existeUsuario = Usuario.filter(usuario => usuario.usuario == login && usuario.password == password);
if (existeUsuario.length > 0)
{
    req.session.usuario = existeUsuario[0].usuario;
    req.session.password = existeUsuario[0].password;
    res.redirect(req.baseUrl);
} else {
    res.render('auth_login', {error: "Usuario incorrecto"});
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/publico');
});

module.exports = router;