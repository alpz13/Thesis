var express = require('express');
var router = express.Router();

var controlador = require('../components/sesiones.js');
var modulo = require('../components/usuario.js');
var estado = require('../components/estado.js');
var carrera = require('../components/carrera.js');
var habilidades = require('../components/habilidades.js');
var busqueda = require('../components/busqueda.js');
var valorexacto = require('../components/valorexacto.js');

router.post('/consultarvacante', function (req, res, next){

	var vacantebuscar = req.body.idVacante;
	var usuario = req.body.idUsuario;

	modulo.consultarPerfil(usuario, function(err, perfil) {
		if(err){
			console.log(err);
		} else {
			busqueda.consultarvacante(vacantebuscar, function(algo) {

				if(algo == null){
					console.log("error de bd");
				} else {
					res.render('vacante',{vacante : algo, perfil :  perfil});

				}
			});
		}
	});

});

module.exports = router;