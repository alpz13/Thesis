$(document).on("click", ".alex", function () { 
    var idUsuario = document.getElementById("algo").value;
    var nombrevacante = document.getElementById("nombrevacante").value;
    var descripcionvacante = document.getElementById("descripcionvacante").value;
    var estado = document.getElementById("estado").value;
    var carrera = document.getElementById("carrera").value;
    var sueldo = document.getElementById("massueldo").value;
    var arreglo = [];
    var lista = document.getElementById("sortable1");
    $(document.getElementById("sortable1")).find("li").each(function(){
        arreglo.push($(this).attr("value"));
    });

    var datos = {
        "idUsuario": idUsuario,
        "arreglo": arreglo,
        "nombrevacante": nombrevacante,
        "descripcionvacante" : descripcionvacante,
        "estado": estado,
        "carrera": carrera,
        "sueldo" : sueldo
    };



    $.post("/usuario/agregaavacante", datos, function(respuesta){
        if (respuesta.match(/^\d+$/)) {
            window.location.assign("/sesiones/iniciarsesionu");
        } else {
            $("#mensajeAgregaModulo").html(respuesta);
        }
    });

});
