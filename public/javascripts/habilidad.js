$(document).on("click", ".alex", function () { 
    var idUsuario = document.getElementById("idUsuario").value;
    var arreglo = [];
    var lista = document.getElementById("sortable1");
    $(document.getElementById("sortable1")).find("li").each(function(){
        arreglo.push($(this).attr("value"));
    });

    var datos = {
        "idUsuario": idUsuario,
        "arreglo": arreglo
    };

    $.post("/usuario/actualizar", datos, function(respuesta){
        if (respuesta.match(/^\d+$/)) {
            window.location.assign("/sesiones/iniciarsesionu");
        } else {
            $("#mensajeAgregaModulo").html(respuesta);
        }
    });

});
