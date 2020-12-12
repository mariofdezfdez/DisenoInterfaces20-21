$(document).ready(function () {
    $('#ubicame').click(iniciar_geolocalizacion);
});

function iniciar_geolocalizacion() {
    navigator.geolocation.getCurrentPosition(geo_consulta, manejo_errores);
}

function manejo_errores(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario no compartió su ubicación geográfica");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("No se pudo detectar la posición geográfica actual");
            break;
        case error.TIMEOUT:
            alert("Se ha agotado el tiempo de espera al consultar posición geográfica");
            break;
        default:
            alert("Error desconocido");
            break;
    }
}

function geo_consulta(posicion) {
    var location = "Latitud: " + posicion.coords.latitude;
    location += " Longitud: " + posicion.coords.longitude;
    showMsg(location);
}

function showMsg(msg)
{
    var status = document.getElementById("status");
    if (status.innerHTML === msg) {
        status.style.color = "green";
    }
    else{
        status.style.color = "red";
    }
    status.innerHTML = msg;
}
