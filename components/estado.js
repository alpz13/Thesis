var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

var listarestados = function(callback) {
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'SELECT idEstado, Estado from estado;';
	conexion.connect();
	conexion.query(consulta, function (err, resultado) {
		conexion.end();
		if(err) {
			console.log(err);
			return callback(err, null);
		}
		console.log('listado de estados');
		return callback(null,resultado);
	});
}


module.exports = {
    'listarestados' : listarestados
    //'abrirUsuario' : abrirUsuario
};
