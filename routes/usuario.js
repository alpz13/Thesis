var express = require('express');
var router = express.Router();
var async = require('async');

var controlador = require('../components/sesiones.js');
var modulo = require('../components/usuario.js');
var estado = require('../components/estado.js');
var carrera = require('../components/carrera.js');
var habilidades = require('../components/habilidades.js');
var busqueda = require('../components/busqueda.js');
var valorexacto = require('../components/valorexacto.js');
var vacantes = require('../components/vacantes.js');

router.post('/home', function(req, res, next) {

    var CredencialesUsuario = {
        "idUsuario" : req.body.idUsuario
    };
    var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000")
    controlador.moverHome(CredencialesUsuario, function (err, UsuariValidado) {
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

router.post('/homee', function(req, res, next) {

    var CredencialesUsuario = {
        "idUsuario" : req.body.idUsuario
    };
    var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000")
    controlador.moverHome(CredencialesUsuario, function (err, UsuariValidado) {
        if(err) {
            res.render('nuevo', {mensaje: 'Error al iniciar sesion'} );;
        } else {
            estado.listarestados(function(err, estados){
                if(err) {
                    console.log(err);
                } else {
                    console.log(estados);
                    busqueda.consultarmisvacantes(CredencialesUsuario.idUsuario, function(vacantes){
                         res.render('empresalogin',{usuario: UsuariValidado, estados:estados, vacantes: vacantes});
                    });

                }
            });
        }
    });
});
        

router.post('/crearUsuario', function(req, res, next) {
    var NuevoUsuario = {
        "nombre" : req.body.cnombreUsuario,
        "contrasenia" : req.body.ccontraseniaUsuario,
        "tipousuario" : 0
    };     

    if (req.session.usuario) {
        callback(new Error('La sesión ya cuenta con un usuario.'));
        return;
    }

      var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000");

    modulo.crearusuarioU(NuevoUsuario, function(err,result) {
        if (err) {
            console.log(err);
            if(err.code === 'ER_DUP_ENTRY') {
                res.send('Un usuario con este nombre ya existe');
            } else {
                res.send('Ocurrio un error al crear un nuevo usuario. Inténtelo más tarde');
            } 
        } else {
            estado.listarestados(function(err, estados){
                carrera.listarcarrera(function(err, carreras){
                    console.log("usuario creado con exito");
                    NuevoUsuario.idUsuario = result;
                    res.render("usuariologin", {usuario : NuevoUsuario, estados: estados, carreras:carreras, sueldos:sueldo});

                });
                
            });
            
        }

    });
});

router.post('/crearEmpresa', function(req, res, next) {
    var NuevaEmpresa = {
        "nombre" : req.body.cnombreEmpresa,
        "contrasenia" : req.body.contraseniaEmpresa,
        "tipousuario" : 1
    };

    if (req.session.usuario) {
        callback(new Error('La sesion ya cuenta con usuario.'));
    }

    modulo.crearusuarioE(NuevaEmpresa, function(err, result) {
        if (err) {
            console.log(err);
            if(err.code === 'ER_DUP_ENTRY') {
                res.send('Un usuario con este nombre ya existe');
            } else {
                res.send('Ocurrio un error al crear un nuevo usuario. Inténtelo más tarde');
            } 
        } else {
            console.log("usuario creado con exito");
            NuevaEmpresa.idUsuario = result;
            req.session.usuario = NuevaEmpresa;
            res.render("usuariologin", {usuario : req.session.usuario});
        }

    });
});

router.post('/nuevavacante', function(req, res, next){
    var usuario = {};
    usuario.idUsuario = req.body.usuarioID;
    var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000")
    carrera.listarcarrera(function(err,carreras) {
        estado.listarestados(function(err, estados) {
            habilidades.todahabilidades(function(Thabilidades){
                controlador.moverHome(usuario, function(err, usuariovalidado) {
                    console.log(Thabilidades);
                    res.render("nuevavacante",{usuario : usuariovalidado, estados:estados, carreras: carreras, todahabilidades:Thabilidades, sueldos:sueldo});
                });
            });
        });
    });

});

router.post('/agregaavacante', function(req, res, next){
    var vacante = {};
    vacante.idUsuario = req.body.idUsuario;
    vacante.nombrevacante = req.body.nombrevacante;
    vacante.descripcionvacante = req.body.descripcionvacante;
    vacante.carrera = req.body.carrera;
    vacante.estado = req.body.estado;
    vacante.sueldo = req.body.sueldo;
    vacantes.agregarvacante(vacante, function(err, result){
        controlador.moverHome(vacante, function (err, UsuariValidado) {
        if(err) {
            res.render('nuevo', {mensaje: 'Error al iniciar sesion'} );;
        } else {
            estado.listarestados(function(err, estados){
                if(err) {
                    console.log(err);
                } else {
                    console.log(estados);
                    busqueda.consultarmisvacantes(vacante.idUsuario, function(vacantes){
                         res.render('empresalogin',{usuario: UsuariValidado, estados:estados, vacantes: vacantes});
                    });

                }
            });
        }
    });


    });
});

router.post('/agregarvacante', function(req, res, next){
    var vacante = {};
    vacante.nombre = req.body.ModNombre;
    vacante.descripcion = req.body.ModDescripcion;
    vacante.edad = req.body.ModEdad;
    vacante.sueldo = req.body.ModSueldo;
    vacante.carrera = req.body.ModCarrera;
    vacante.estado = req.body.ModEstado;
    vacante.idusuario = req.body.ModidUsuario;

    console.log(vacante);
    var idempresa =req.body.ModidUsuario;

    console.log(idempresa);

    vacantes.agregarvacante(vacante, function(err, result){
        var sueldo = new Array("5000","15000","25000","35000","45000","55000","65000","75000","85000","95000","105000","115000","125000","135000")
        controlador.abrirUsuarioe(idempresa, function (err, UsuariValidado) {
            if(err) {
                console.log(err);
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
                                    res.render('empresalogin',{usuario: UsuariValidado, estados:estados, carreras:carreras, vacantes:vacantes, sueldos : sueldo})
                                });
                            }
                        });
                    }
                });           
            }
        });

    });
});



router.post('/busqueda', function(req, res, next) {

    var usuario = req.body.idUsuario;
    var estado = req.body.Estado;
    var carrera = req.body.Carrera;
    var ingreso = req.body.Ingreso;
    var preconsulta = "";
    var megalista = [];
    var megalista2 = [];

    if(estado > 0){
        //desprecia edo;
        preconsulta = preconsulta + " AND e.idEstado = " + estado ;
    }
    if(carrera > 0){
        //desprecia carrera;
        preconsulta = preconsulta + " AND c.idCarrera = " + carrera ;
    }
    if(ingreso > 0){
        //desprecia ingreso
        preconsulta = preconsulta + " AND v.sueldo >= " + ingreso ;
    }

    modulo.consultarPerfil(usuario, function (err, perfil) {   
        busqueda.tagsxusuario(usuario, function(tagsusuario){
            busqueda.idvacanteporinputusuario(preconsulta, perfil.edad, function(listaidVacante){
                async.eachSeries(listaidVacante, function(prime, callback){
                    busqueda.tagsporvacante(prime.idVacante, function(tags){
                        if(tags != null){
                            //tags es un objeto;
                            valorexacto.calculavalorExacto(tags,tagsusuario,usuario, function(resultadovalorexacto){
                                valorexacto.calculaLowerLimit(tags,tags,tagsusuario,usuario, function(resultadolowerlimit){
                                    valorexacto.calculaUpperLimit(tags, tags, tagsusuario, usuario, function(resultadoUpperlimit){ 
                                        valorexacto.calculaLowerANDUpperLimit(tags, tagsusuario, usuario, function(resultadoLowerUpperlimit){
                                            var vacante = {};
                                            var ideal = resultadovalorexacto + resultadolowerlimit + resultadoUpperlimit + resultadoLowerUpperlimit;
                                            vacante.vacante = prime.idVacante;
                                            vacante.ve = resultadovalorexacto;
                                            vacante.ll = resultadolowerlimit;
                                            vacante.up = resultadoUpperlimit;
                                            vacante.lul = resultadoLowerUpperlimit;
                                            vacante.ideal = ideal;
                                            megalista.push(vacante);
                                        });
                                    });
                                });
                            });
                        } else{
                            console.log('no hay match');
                        }
                    });
                    callback();
                }, function (err){
                    console.log('Termino YUJU');
                    console.log(megalista);
                    var vacantespadres = [];
                    for(i = 0 ; i <= megalista.length - 1 ; i++){
                        if(megalista[i].ideal >= -50){
                            vacantespadres.push(megalista[i].vacante);
                        }
                    }

                    async.eachSeries(vacantespadres, function (elemento, callback) {
                        busqueda.buscarvacante(elemento, function(resultado){
                            var muybuenavacante = {};
                            console.log('RESULTADOS ' + resultado[0].nombrev); 
                            console.log('ELEMENTO ' + elemento);
                            muybuenavacante.idVacante = resultado[0].idVacante;
                            muybuenavacante.nombre = resultado[0].nombrev;
                            muybuenavacante.sueldo = resultado[0].sueldo;
                            muybuenavacante.edad = resultado[0].edad;
                            muybuenavacante.carrera = resultado[0].nombreCarrera;
                            muybuenavacante.estado = resultado[0].Estado;
                            megalista2.push(muybuenavacante);
                            callback();
                        });
                    }, function (err) {
                        if (err) { 
                            throw err;
                        }
                        //console.log(megalista2);
                        modulo.consultarPerfil(usuario, function (resultados){
                            res.render('busqueda', {vacantesexelentes : megalista2, usuario : resultados, perfil : perfil});

                        });
                        //console.log('Well done :-)! ' + x);
                    });
                });
            });

        });
    });


    async.eachSeries([ 2, 3, 5, 7, 11 ], function (prime, callback) {
        console.log(prime);
        x = prime;
        callback(); // Alternatively: callback(new Error());
    }, function (err) {
        if (err) { 
            throw err;
        }
        console.log('Well done :-)! ' + x);
    });




    /*
    busqueda.tagsxusuario(usuario, function(tagsusuario){
        busqueda.idvacanteporinputusuario(preconsulta, function(listaidVacante){
            if(listaidVacante != null){
                listaidVacante.forEach(function (elemento){
                    busqueda.tagsporvacante(elemento.idVacante,function(tags){
                        if(tags != null){
                            //tags es un objeto;
                            valorexacto.calculavalorExacto(tags,tagsusuario,usuario, function(resultadovalorexacto){
                                valorexacto.calculaLowerLimit(tags,tags,tagsusuario,usuario, function(resultadolowerlimit){
                                    valorexacto.calculaUpperLimit(tags, tags, tagsusuario, usuario, function(resultadoUpperlimit){ 
                                        valorexacto.calculaLowerANDUpperLimit(tags, tagsusuario, usuario, function(resultadoLowerUpperlimit){
                                            console.log('ID de vacante ' + elemento.idVacante);
                                            console.log('resultado valor exacto ' + resultadovalorexacto);
                                            console.log('resultado lower limit ' + resultadolowerlimit);
                                            console.log('resultado upper limit ' + resultadoUpperlimit);
                                            console.log('resultado lower upper limit ' + resultadoLowerUpperlimit);
                                            var ideal = resultadovalorexacto + resultadolowerlimit + resultadoUpperlimit + resultadoLowerUpperlimit;
                                            console.log('resultado ideal ' + ideal);
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
                */
                /*
                    busqueda.tagsporvacante(listaidVacante[i].idVacante,function(tags){
                        if(tags != null){
                            //tags es un objeto;
                            valorexacto.calculavalorExacto(tags,tagsusuario,usuario, function(resultadovalorexacto){
                                valorexacto.calculaLowerLimit(tags,tags,tagsusuario,usuario, function(resultadolowerlimit){
                                    valorexacto.calculaUpperLimit(tags, tags, tagsusuario, usuario, function(resultadoUpperlimit){ 
                                        valorexacto.calculaLowerANDUpperLimit(tags, tagsusuario, usuario, function(resultadoLowerUpperlimit){
                                            console.log('ID de vacante ' + listaidVacante[i].idVacante);
                                            console.log('resultado valor exacto ' + resultadovalorexacto);
                                            console.log('resultado lower limit ' + resultadolowerlimit);
                                            console.log('resultado upper limit ' + resultadoUpperlimit);
                                            console.log('resultado lower upper limit ' + resultadoLowerUpperlimit);
                                            var ideal = resultadovalorexacto + resultadolowerlimit + resultadoUpperlimit + resultadoLowerUpperlimit;
                                            console.log('resultado ideal ' + ideal);
                                        })
                                    });
                                });
                            });
                        }
                    });
                }*/
                /*
            } else {
                console.log('no hay match');
            }
        });

    });
    */
});

router.post('/consultarperfil', function(req, res, next) {
    //console.log(req.session.usuario.idUsuario);
    console.log("aqui entro");
    var idUsuario = req.body.idUsuario;
    modulo.consultarPerfil(idUsuario, function (err, perfil) {
        if(err) {
            console.log(err);
        } else {
            console.log("Datos del usuario");
            estado.listarestados(function (err,estados) {
                if(err) {
                    console.log(err);
                } else {
                    carrera.listarcarrera(function(err, carrera) {
                        if(err) {
                            console.log(err);
                        }
                        habilidades.todahabilidades(function(err, habilidades) {
                            if(err) {
                                console.log(err);
                            }
    
                            res.render("usuario",{perfil : perfil, estados: estados, carreras: carrera});
                        });
                    });
                }
            });
        }

    });

});


router.post('/consultarperfile', function(req, res, next) {
    //console.log(req.session.usuario.idUsuario);
    console.log("aqui entro");
    var idUsuario = req.body.idUsuario;
    modulo.consultarPerfil(idUsuario, function (err, perfil) {
        if(err) {
            console.log(err);
        } else {
            console.log("Datos del usuario");
            estado.listarestados(function (err,estados) {
                if(err) {
                    console.log(err);
                } else {
                    carrera.listarcarrera(function(err, carrera) {
                        if(err) {
                            console.log(err);
                        }
                        habilidades.todahabilidades(function(err, habilidades) {
                            if(err) {
                                console.log(err);
                            }
    
                            res.render("usuarioe",{perfil : perfil, estados: estados, carreras: carrera});
                        });
                    });
                }
            });
        }

    });

});

router.post('/actualizar', function(req, res, next) {
    
    var idUsuario = req.body.idUsuario;
    var habilidades = [];
    for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
        habilidades.push(req.body[key]);
        }
    }
    console.log(habilidades[1]);
    //habilidades[1][elementos]
    for(i = 0; i <= habilidades[1].length - 1; i++){
        console.log(habilidades[1][i]);
        modulo.actualizarhabilidades(idUsuario, habilidades[1][i], function(err) {
            if(err) {
                console.log(err)
            }
        });
    }
    res.redirect("/usuario");
});

router.post('/modificar', function(req, res, next) {

    var ModUsuario = {
        "idUsuario" : req.body.ModidUsuario,
        "nombre" : req.body.ModNombre,
        "contrasenia" : req.body.ModContrasena,
        "recontrasenia" : req.body.ModReContrasena,
        "telefono" : req.body.ModTelefono,
        "edad"     : req.body.ModEdad,
        "correo" : req.body.ModCorreo,
        "estado" : req.body.ModEstado,
        "carrera" : req.body.ModCarrera
    };

    console.log(req.body);

    modulo.modificar(ModUsuario, function(err) {
        if(err) {
            console.log(err);
        } else {

            console.log("usuario modifciado con exito");
            modulo.consultarPerfil(ModUsuario.idUsuario, function (err, perfil){
                estado.listarestados(function (err,estados) {
                    if(err) {
                        console.log(err);
                    } else {
                        carrera.listarcarrera(function(err, carrera) {
                            if(err) {
                                console.log(err);
                            }
                            habilidades.todahabilidades(function(err, habilidades) {
                                if(err) {
                                    console.log(err);
                                }
                                res.render("usuario",{perfil : perfil, estados: estados, carreras: carrera});
                            });
                        });
                    }
                });        
            });    
        }
    });
});

module.exports = router;