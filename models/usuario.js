const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
      },
      password: {
        type: String,
        minlength: 6,
        required: true,
      },
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;