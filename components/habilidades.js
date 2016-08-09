var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

var todahabilidades = function (callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'Select h.idHabiliada, h.habilidad from hab h;';
    conexion.connect();
    conexion.query(consulta, function (err, result) {
        conexion.end();
        if (err) {
            console.log(err);
            return callback(err);
        }
        return callback(result);
    });

};


module.exports = {
    'todahabilidades'   : todahabilidades
};
