var express = require('express');
var router = express.Router();

var controlador = require('../components/sesiones.js');
var estado = require('../components/estado.js');
var carrera = require('../components/carrera.js');
var Registro = require('log');
var observador = new Registro('info');
var busqueda = require('../components/busqueda.js');
var habilidades = require('../components/habilidades.js');

/* POST datos de inicio de sesión. */
router.post('/iniciarsesionu', function (req, res, next) {
    var CredencialesUsuario = {
        "nombre" : req.body.inombreusuario,
        "contrasenia" : req.body.icontraseniausuario,
    };
    var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000")
    controlador.abrirUsuario(CredencialesUsuario, function (err, UsuariValidado) {
        if(err) {
            res.render('nuevo', {mensaje: 'Error al iniciar sesion'} );;
        } else {
            estado.listarestados(function(err, estados){
                if(err){
                    console.log(err);
                } else {
                    carrera.listarcarrera(function(err, carreras){
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('usuariologin',{usuario: UsuariValidado, estados:estados, carreras:carreras, sueldos:sueldo});
                        }
                    });
                }
            });
        }
    });
});

router.post('/iniciarsesione', function (req, res, next) {
    var CredencialesEmpresa = {
        "nombre" : req.body.inombreempresa,
        "contrasenia" : req.body.icontraseniaempresa,
    };
    var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000")
    controlador.abrirUsuario(CredencialesEmpresa, function (err, UsuariValidado) {
        if(err) {
            res.render('nuevo', {mensaje: 'Error al iniciar sesion'} );;
        } else {
            estado.listarestados(function(err, estados){
                if(err) {
                    console.log(err);
                } else {
                    carrera.listarcarrera(function(err, carreras){
                        if(err) {
                            console.log(err);
                        } else {
                            busqueda.consultarmisvacantes(UsuariValidado.idUsuario, function(vacantes){
                                    res.render('empresalogin',{usuario: UsuariValidado,vacantes:vacantes});
                            });
                        }
                    });
                }
            });           
        }
    });

});

router.get('/cerrar', function (req, res, next) {
    res.redirect('/');
	//Este ya no hace nada porque ya se mandó es repsonse en el redirect.
    //res.render('index', {mensaje: 'Sesión cerrada'});
    controlador.cerrarSesion(req);
});


module.exports = router;
