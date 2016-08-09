var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

/*
*/
var abrirUsuario = function (CredencialesUsuario, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'SELECT idUsuario, nombre, password, tipoUsuario FROM usuario WHERE `nombre` = ? AND `password` = ?;';
    var valores = [CredencialesUsuario.nombre,CredencialesUsuario.contrasenia];
    consulta = mysql.format(consulta, valores);
    conexion.connect();
    conexion.query(consulta, function(err, resultado) {
        conexion.end();
        if(err) {
            console.log(err);
            return callback(err, null);
        }

        if (resultado.length === 0) {
            callback(new Error('Usuario no existe.'));
            return;
        }

        var usuario = {};
        usuario.idUsuario = resultado[0].idUsuario;
        usuario.nombre = resultado[0].nombre;
        usuario.password = resultado[0].password;
        usuario.tipoUsuario = resultado[0].tipoUsuario;

        return callback(null,usuario);
    });


};

var abrirUsuarioe = function (CredencialesUsuario, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'SELECT idUsuario, nombre, password, tipoUsuario FROM usuario WHERE `idUsuario` = ? ;';
    var valores = [CredencialesUsuario];
    consulta = mysql.format(consulta, valores);
    conexion.connect();
    conexion.query(consulta, function(err, resultado) {
        conexion.end();
        if(err) {
            console.log(err);
            return callback(err, null);
        }

        if (resultado.length === 0) {
            callback(new Error('Usuario no existe.'));
            return;
        }

        var usuario = {};
        usuario.idUsuario = resultado[0].idUsuario;
        usuario.nombre = resultado[0].nombre;
        usuario.password = resultado[0].password;
        usuario.tipoUsuario = resultado[0].tipoUsuario;

        return callback(null,usuario);
    });


};

var moverHome = function (CredencialesUsuario, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'SELECT idUsuario, nombre, password, tipoUsuario FROM usuario WHERE `idUsuario` = ?;';
    var valores = [CredencialesUsuario.idUsuario];
    consulta = mysql.format(consulta, valores);
    conexion.connect();
    conexion.query(consulta, function(err, resultado) {
        conexion.end();
        if(err) {
            console.log(err);
            return callback(err, null);
        }

        if (resultado.length === 0) {
            callback(new Error('Usuario no existe.'));
            return;
        }

        var usuario = {};
        usuario.idUsuario = resultado[0].idUsuario;
        usuario.nombre = resultado[0].nombre;
        usuario.password = resultado[0].password;
        usuario.tipoUsuario = resultado[0].tipoUsuario;

        return callback(null,usuario);
    });


};

var cerrarSesion = function (req) {
    req.session.destroy();
    return true;
};

module.exports = {
    'cerrarSesion' : cerrarSesion,
    'abrirUsuario' : abrirUsuario,
    'moverHome'    : moverHome,
    'abrirUsuarioe' : abrirUsuarioe
};
