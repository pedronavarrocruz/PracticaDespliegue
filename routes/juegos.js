const express = require('express');
const multer  = require('multer')

let Juego = require(__dirname + '/../models/juego.js');
let router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage: storage});

router.get('/', (req, res) => {
    Juego.find().then(resultado => {
        res.render('admin_juegos', { juegos: resultado});
    }).catch (error => {
    }); 
});

router.get('/juegos/nuevo', (req, res) => {
    res.render('admin_juegos_form');
});

router.get('/juegos/editar/:id', (req, res) => {
    Juego.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('admin_juegos_form', {juego: resultado});
        } else {
            res.render('admin_error', {error: "Juego no encontrado"});
        }
    }).catch(error => {
        res.render('admin_error', {error: "Juego no encontrado"});
    });
});

router.post('/juegos', (req, res) => {
    let nuevoJuego = new Juego({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad: req.body.edad,
        jugadores: req.body.jugadores,
        tipo: req.body.tipo,
        precio: req.body.precio,
        imagen: req.body.path
    });
    nuevoJuego.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error insertando juego"});
    });
});

router.put('/juegos/:id', (req, res) => {
    Juego.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            imagen: req.body.path
        }
    }, {new: true}).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error modificando juego"});
    });
});

router.delete('/juegos/:id', (req, res) => {
    Juego.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error borrando juego"});
    });
});

module.exports = router;