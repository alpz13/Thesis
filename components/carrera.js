var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

var listarcarrera = function (callback) {
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'SELECT idCarrera, nombreCarrera from carrera;';
	conexion.connect();
	conexion.query(consulta, function (err, resultado) {
		conexion.end();
		if(err) {
			console.log(err);
			return callback(err, null);
		}
		console.log('listado de carreras');
		return callback(null, resultado);
	});
}


module.exports = {
    'listarcarrera' : listarcarrera
    //'abrirUsuario' : abrirUsuario
};
