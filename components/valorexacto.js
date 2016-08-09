var mysql = require('mysql');
var credenciales = require('../database/credencialesbd.json');

var sumatorialistahab = function(habilidades,callback){
	var suma = 0;
	for(i=0 ; i <= habilidades.length - 1; i++) {
		suma = suma + habilidades[i].idHabilidad;
	}
	return callback(suma);
}

var calculavalorExacto = function (listadehabilidades, tagsusuario, idUsuario,callback){
	var potencia = 1/idUsuario;

	for(i = 0; i <= listadehabilidades.length - 1; i++){
		for(j = 0; j <= tagsusuario.length - 1; j++){
			if(listadehabilidades[i].idHabilidad == tagsusuario[j].idHabilidad){
				listadehabilidades[i].idHabilidad = 0;
			}
		}
	}

	sumatorialistahab(listadehabilidades, function(sumatoria){
		var valorexacto = -1 * (Math.pow(sumatoria, potencia));
		return callback(valorexacto);
	});

};

var calculaLowerLimit = function(listadehabilidades,listadehabilidades2, tagsusuario, idUsuario, callback) {
	var potencia = 1/idUsuario;
	//SL+
	for(i = 0; i <= listadehabilidades.length - 1 ; i++){
		for(j = 0; j <= tagsusuario.length - 1 ; j++){
			if(listadehabilidades[i].idHabilidad == tagsusuario[j].idHabilidad){
				listadehabilidades[i].idHabilidad = 0;
			}
		}
	}

	//SL
	for(i = 0; i <= listadehabilidades2.length - 1 ; i++){
		for(j = 0; j <= tagsusuario.length - 1 ; j++){
			if(listadehabilidades2[i].idHabilidad == tagsusuario[j].idHabilidad){
				listadehabilidades2[i].idHabilidad = 0;
			}
		}
	}

	sumatorialistahab(listadehabilidades, function (sumatoria){
		var SL = Math.pow(sumatoria,potencia);
		sumatorialistahab(listadehabilidades2, function(sumatoria2){
			var sl = -1 * (Math.pow(sumatoria2, potencia));
			var SLL = SL + sl;
			return callback(SLL);
		});
	});
}

var calculaUpperLimit = function(listadehabilidades, listadehabilidades2, tagsusuario, idUsuario, callback) {
	var potencia = 1/idUsuario;
	//SU-
	for(i = 0; i <= listadehabilidades.length - 1 ; i++){
		for(j = 0; j <= tagsusuario.length - 1 ; j++){
			if(listadehabilidades[i].idHabilidad == tagsusuario[j].idHabilidad){
				listadehabilidades[i].idHabilidad = 0;
			}
		}
	}

	//SU+
	for(i = 0; i <= listadehabilidades2.length - 1 ; i++){
		for(j = 0; j <= tagsusuario.length - 1; j++){
			if(listadehabilidades2[i].idHabilidad == tagsusuario[j].idHabilidad){
				listadehabilidades2[i].idHabilidad = 0;
			}
		}
	}
	sumatorialistahab(listadehabilidades, function(sumatoria){
		var su = -1 * (Math.pow(sumatoria, potencia));
		sumatorialistahab(listadehabilidades2, function(sumatoria2){
			var SU = Math.pow(sumatoria2, potencia);
			var SUL = su + SU;
			return callback(SUL);
		});
	});
}

var calculaLowerANDUpperLimit = function(listadehabilidades, tagsusuario, idUsuario, callback) {
	var potencia = 1/idUsuario;
	//SLU
	for(i = 0; i <= listadehabilidades.length - 1 ; i++){
		for(j = 0; j <= tagsusuario.length - 1 ; j++){
			if(listadehabilidades[i].idHabilidad == tagsusuario[j].idHabilidad){
				listadehabilidades[i].idHabilidad = 0;
			}
		}
	}
	sumatorialistahab(listadehabilidades, function(sumatoria){
		var SLU = -1 * (Math.pow(sumatoria, potencia));
		return callback(SLU);
	});

}


module.exports = {
    'calculavalorExacto'         :  calculavalorExacto,
    'calculaLowerLimit'          :  calculaLowerLimit,
    'calculaUpperLimit'          :  calculaUpperLimit,
    'calculaLowerANDUpperLimit'  :  calculaLowerANDUpperLimit
    //'abrirUsuario' : abrirUsuario
};
