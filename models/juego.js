const mongoose = require('mongoose');

let edicionesSchema = new mongoose.Schema({
  edicion: {
    type: String,
    required: true,
  },
  anyo: {
    type: Number,
    min: 2000,
    max: 2023,
  },
});

let juegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 6,
  },
  descripcion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  jugadores: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero'],
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  imagen: {
    type: String,
  },
  ediciones: [edicionesSchema],
});

let Juego = mongoose.model('juego', juegoSchema);

module.exports = Juego;
