
var bd;
function iniciar() {

    zonadatos = document.getElementById("zonadatos");
    botonGrabar = document.getElementById("grabar");
    botonActualizar = document.getElementById("actualizar");
    botonBorrar = document.getElementById("borrar");
    botonVaciarBD = document.getElementById("vaciar");
    botonEliminarBD = document.getElementById("eliminar");
    
    botonGrabar.addEventListener("click", agregarObjeto, false);
    botonActualizar.addEventListener("click", actualizarObjeto, false);
    botonBorrar.addEventListener("click", borrarObjeto, false);
    botonVaciarBD.addEventListener("click", vaciarBD, false);
    botonEliminarBD.addEventListener("click", eliminarBD, false);

    var solicitud = window.indexedDB.open("BDMontecastelo");

    solicitud.onsuccess = function (e) {
        bd = e.target.result;
    };
    solicitud.onupgradeneeded = function (e){
        bd = e.target.result;
        bd.createObjectStore("alumnos", {keyPath: "dni"});
    };

}

function agregarObjeto(){
    var dni = document.getElementById("dni").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    
    var transaccion = bd.transaction(["alumnos"], "readwrite");
    
    var almacen = transaccion.objectStore("alumnos");
    
    var agregar = almacen.add({dni: dni, nombre: nombre, apellidos: apellidos});
    
    agregar.addEventListener("success", mostrar, false);
    
}

function actualizarObjeto(){
    var dni = document.getElementById("dni").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    
    var transaccion = bd.transaction(["alumnos"], "readwrite");
    
    var almacen = transaccion.objectStore("alumnos");
    
    var actualizar = almacen.put({dni: dni, nombre: nombre, apellidos: apellidos});
    
    actualizar.addEventListener("success", mostrar, false);
    
}

function borrarObjeto(){
    var dni = document.getElementById("dni").value;
    
    var transaccion = bd.transaction(["alumnos"], "readwrite");
    
    var almacen = transaccion.objectStore("alumnos");
    
    var actualizar = almacen.delete(dni);
    
    actualizar.addEventListener("success", mostrar, false);   
}

function vaciarBD(){   
    var transaccion = bd.transaction(["alumnos"], "readwrite");
    
    var almacen = transaccion.objectStore("alumnos");
    
    var borrar = almacen.clear();
    
    borrar.addEventListener("success", mostrar, false);
    
}

function eliminarBD(){
    
    window.indexedDB.deleteDatabase("BDGatos");
    
}

function mostrar(){
    
    zonadatos.innerHTML = "";
    
    var transaccion = bd.transaction(["alumnos"], "readonly");
    
    var almacen = transaccion.objectStore("alumnos");
    
    var cursor = almacen.openCursor();
    
    cursor.addEventListener("success", mostrarDatos, false);
}

function mostrarDatos(e){
    
    var cursor = e.target.result;
    
    if (cursor) {
        
        zonadatos.innerHTML += "<div>" + cursor.value.dni + " - "
        + cursor.value.nombre + " - " + cursor.value.apellidos + "</div>";

        cursor.continue();
    }
}

window.addEventListener("load", iniciar, false);

