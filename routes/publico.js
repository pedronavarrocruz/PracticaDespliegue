const express = require('express');
let router = express.Router();
let Juego = require(__dirname + '/../models/juego.js');

router.get('/', (req, res) => {
    res.render('publico_index');
});

router.get('/buscar', (req, res) => {
    Juego.find().then(resultado => {
        if (resultado) {
            let nuevoResultado = resultado.filter((r)=>r.nombre.includes(req.query.buscar))
            res.render('publico_index', {juegos: nuevoResultado});
        } else {
            res.status(500)
                .send({ok: false, error: "No se encontraron juegos"});
        }
    }).catch(error => {
        res.render('publico_error');
    });
});

router.get('/juegos/:id', (req, res) => {
    Juego.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('publico_juego', {juego: resultado});
        } else {
            res.render('publico_error', {error: "Juego no encontrado"});
        }
    }).catch(error => {
        res.render('publico_error', {error: "Juego no encontrado"});
    });
});

module.exports = router;