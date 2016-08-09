var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

/*
*/

var crearusuarioU = function (NuevoUsuario, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'INSERT INTO usuario (nombre, password, idCarrera, idEstado, tipoUsuario) VALUES (?,?,1,1,0);',
        params = [NuevoUsuario.nombre, NuevoUsuario.contrasenia];
    conexion.connect();
    consulta = mysql.format(consulta, params);
    conexion.query(consulta, function (err, result) {
        conexion.end();
        if (err) {
            console.log(err);
            return callback(err,null);
        }
        console.log('Usuario creado');
        return callback(null, result.insertId);
    });

};

var crearusuarioE = function(NuevaEmpresa, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'INSERT INTO usuario (nombre, password, idCarrera, idEstado, tipoUsuario) VALUES (?,?,1,1,1);',
        params = [NuevaEmpresa.nombre, NuevaEmpresa.contrasenia];
    conexion.connect();
    consulta = mysql.format(consulta, params);
    conexion.query(consulta, function (err, result) {
        conexion.end();
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        console.log('Empresa Creada');
        return callback(null, result.insertId);
    });
};

var consultarPerfil = function(idUsuario, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'SELECT u.nombre, u.password, u.telefono, u.correo, u.edad, e.Estado, c.nombreCarrera from usuario u, estado e, carrera c WHERE u.idCarrera = c.idCarrera AND e.idEstado = u.idEstado and u.idUsuario = ?',
        params = [idUsuario];

    conexion.connect();
    consulta = mysql.format(consulta, params);
    conexion.query(consulta, function (err, resultado) {
        conexion.end();
        if(err) {
            console.log(err);
            return callback(err, null);
        }
        consultarHabilidades(idUsuario, function(err, habilidades) {
            if(err) {
                console.log(err);
            }
            consultarTodasHabilidades(function(err, todashab){
                if(err) {
                    console.log(err);
                }
                var perfil = {
                "idUsuario" : idUsuario,
                "nombre" : resultado[0].nombre,
                "password" : resultado[0].password,
                "telefono" : resultado[0].telefono,
                "correo" : resultado[0].correo,
                "edad"   : resultado[0].edad,
                "Estado" : resultado[0].Estado,
                "nombreCarrera" : resultado[0].nombreCarrera,
                "habilidades" : habilidades,
                "Thabilidades" : todashab
                };
                console.log('regresando datos de usuario');
                return callback(null,perfil);

            });
            
           
        });
    });
};

var consultarTodasHabilidades = function(callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'Select h.idHabiliada, h.habilidad from hab h;';
    conexion.connect();
    conexion.query(consulta, function(err, resultado) {
        conexion.end();
        if(err) {
            console.log(err);
            return callback(err, null);
        }
        console.log('todashab');
        return callback(null, resultado);
    });
};

var consultarHabilidades = function(idUsuario, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'select distinct h.idHabiliada, h.habilidad from hab h, usuhab uh, usuario u Where u.idUsuario = uh.idUsuario AND uh.idHabilidad = h.idHabiliada AND u.idUsuario = ?;',
    params = [idUsuario];
    consulta = mysql.format(consulta, params);
    conexion.connect();
    conexion.query(consulta, function (err, resultado) {
        conexion.end();
        if(err) {
            console.log(err);
            return callback(err, null);
        }
        console.log('habilidades de usuario');
        return callback(null, resultado);
    });

};

var modificar = function(ModUsuario, callback) {

    var conexion = mysql.createConnection(credenciales);
    var consulta = 'UPDATE `usuario` SET `nombre` = ?, `password` = ?, `telefono` = ?, `edad` = ?, `correo` = ?, `idEstado` = ?, `idCarrera` = ? WHERE idUsuario = ?;',
        params = [ModUsuario.nombre, ModUsuario.contrasenia, ModUsuario.telefono, ModUsuario.edad, ModUsuario.correo, ModUsuario.estado, ModUsuario.carrera, ModUsuario.idUsuario];
    conexion.connect();
    consulta = mysql.format(consulta, params);
    conexion.query(consulta, function (err) {
        if(err) {
            console.log(err);
            return callback(err);
        }
        callback(null);
    });
};

var actualizarhabilidades = function(idUsuario,Habilidades, callback) {
    var conexion = mysql.createConnection(credenciales);
    var consulta = 'INSERT INTO `usuhab`(`idUsuario`, `idHabilidad`) VALUES ('+ idUsuario + ',' +Habilidades+');';
    conexion.connect();
    console.log(consulta);
    conexion.query(consulta, function(err) {
        if(err) {
            console.log(err);
            return callback(err);
        }
    });
};

module.exports = {
    //'abrirSesion' : abrirSesion,
    'crearusuarioU'   : crearusuarioU,
    'crearusuarioE'   : crearusuarioE,
    'modificar'       : modificar,
    'consultarPerfil' : consultarPerfil,
    'actualizarhabilidades' : actualizarhabilidades
};
