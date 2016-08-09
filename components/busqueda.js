var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

var tagsporvacante = function (idVacante, callback) {
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'SELECT DISTINCT vh.idHabilidad FROM vachab vh WHERE vh.idVacante = ? ORDER BY vh.idHabilidad ASC';
	var valor = [idVacante];
	consulta = mysql.format(consulta, valor);
	conexion.connect();
	conexion.query(consulta, function (err, resultado) {
		conexion.end();
		if(err) {
			console.log(err);
			return callback(null);
		}
		console.log('lista de tagas por vacante');
		return callback(resultado);
	});
};

var buscarvacante = function(idVacante, callback){
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'Select v.idVacante ,v.nombrev, v.sueldo,v.edad, e.Estado, c.nombreCarrera from vacantes v, estado e, carrera c WHERE e.idEstado = v.idEstado AND v.idCarrera = c.idCarrera AND v.idVacante = ?',
		params = [idVacante];
	conexion.connect();
	consulta = mysql.format(consulta, params);
	conexion.query(consulta, function(err, resultado) {
		conexion.end();
		if(err) {
			console.log(err);
			return callback(null);
		}
		console.log('regresa vacantes que son buena onda =D');
		console.log(resultado);
		return callback(resultado);
	});
};

var idvacanteporinputusuario = function(preconsulta, edad, callback){
	var conexion = mysql.createConnection(credenciales);
	var age = edad;
	var minedad = 18;
	var maxedad = age + 5;
	console.log(age);
	if(minedad < 18){
		minedad = 18;
	}
	var consulta = 'SELECT DISTINCT v.idVacante from vacantes v, estado e, carrera c WHERE v.idEstado = e.idEstado AND v.idCarrera = c.idCarrera ' + preconsulta + ' ORDER BY v.idVacante ASC';
	conexion.connect();
    conexion.query(consulta, function(err, resultado) {
    	conexion.end();
    	if(err) {
    		console.log(err);
    		return callback(null);
    	}
    	console.log('regresa id de vacantes segun input');
    	return callback(resultado);
    });

};

var tagsxusuario = function(idUsuario, callback){
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'SELECT DISTINCT uh.idHabilidad FROM usuhab uh WHERE uh.idUsuario = ? ORDER BY uh.idHabilidad ASC',
		params = [idUsuario];
    conexion.connect();
    consulta = mysql.format(consulta, params);
	conexion.query(consulta, function (err, resultado) {
		conexion.end();
		if(err){
			console.log(err);
			return callback(null);
		}
		console.log('tags del usuario');
		return callback(resultado);
	});
};

var consultarvacante = function(idVacante , callback){
	var algo = {};
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'SELECT v.nombrev, v.descripcion, v.sueldo, e.Estado, c.nombreCarrera, u.nombre, u.telefono, u.correo FROM vacantes v, estado e, carrera c, usuario u WHERE v.idEstado = e.idEstado AND v.idCarrera = c.idCarrera AND v.idUsuario = u.idUsuario AND v.idVacante = ?;';
	var valor = [idVacante];
	conexion.connect();
	consulta = mysql.format(consulta, valor);
	console.log("despues de format");
	conexion.query(consulta, function(err, resultado){
		conexion.end();
		if(err) {
			console.log(err);
			return callback(null);
		}
		console.log(resultado);
		algo.nombre = resultado[0].nombrev;
		algo.descripcion = resultado[0].descripcion;
		algo.sueldo = resultado[0].sueldo;
		algo.estado = resultado[0].Estado;
		algo.carrera = resultado[0].nombreCarrera;
		algo.persona = resultado[0].nombre;
		algo.telefono = resultado[0].telefono;
		algo.correo = resultado[0].correo;
		console.log("algo");
		console.log(algo);

		return callback(algo);
	});
};

var consultarmisvacantes = function(idUsuario, callback){
	var conexion = mysql.createConnection(credenciales);
	var consulta = 'SELECT v.idVacante, v.nombrev, v.descripcion, v.edad, v.sueldo, e.Estado, c.nombreCarrera FROM vacantes v, carrera c, usuario u, estado e WHERE v.idCarrera = c.idCarrera AND e.idEstado = v.idEstado AND v.idUsuario = u.idUsuario AND v.idUsuario = ?;',
		params = [idUsuario];
    conexion.connect();
    consulta = mysql.format(consulta, params);
	conexion.query(consulta, function (err, resultado) {
		conexion.end();
		if(err){
			console.log(err);
			return callback(null);
		}
		tagsporvacante(resultado.idVacante, function(err, res){

		});
		console.log('tags del usuario');
		return callback(resultado);
	});
};

module.exports = {
    'idvacanteporinputusuario' : idvacanteporinputusuario,
    'tagsporvacante' : tagsporvacante,
    'tagsxusuario' : tagsxusuario,
    'buscarvacante' : buscarvacante,
    'consultarvacante' : consultarvacante,
    'consultarmisvacantes' : consultarmisvacantes
    //'abrirUsuario' : abrirUsuario
};
