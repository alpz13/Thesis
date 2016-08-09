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
};

var agregarvacante = function(vacante,callback) {
	var conexion = mysql.createConnection(credenciales);
    var consulta = 'INSERT INTO vacantes (idEstado, idCarrera, nombrev, descripcion,sueldo, idUsuario) VALUES (?,?,?,?,?,?);',
        params = [vacante.estado, vacante.carrera, vacante.nombrevacante, vacante.descripcionvacante, vacante.sueldo, vacante.idUsuario];
    conexion.connect();
    consulta = mysql.format(consulta, params);
    conexion.query(consulta, function (err, result) {
        conexion.end();
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log('Usuario creado');
        return callback(null);
    });

};

var modificarvacante = function(callback) {

};

module.exports = {
    'agregarvacante' : agregarvacante,
    'modificarvacante' : modificarvacante
    //'abrirUsuario' : abrirUsuario
};
