document.getElementById("formTarea").addEventListener("submit", salvarTarea);
//salvar tarea captura el evento submit nosotros interceptamos el evento
// para manejarlo

function salvarTarea(e) {
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  console.log(titulo);
  console.log(descripcion);

  if (titulo == "" || descripcion == "") {
    //control de que alla llenado los campos
    alert("Debe llenar todos los campos");
    document.getElementById("titulo").focus;
    exit;
  }

  //transforma variables a un objeto tarea
  let tarea = {
    titulo,
    descripcion,
  };
  console.log(tarea);
  // Funcionalidad localstorage ya lo trae el navegador nos permite guardar datos
  // y no perderlos aunque se cierre el navegador

  if (localStorage.getItem("tareas") === null) {
    //no hay tareas en la localStorage
    let tareas = []; //se crea arreglo de tareas
    tareas.push(tarea); //lleno el array con el objeto tarea
    localStorage.setItem("tareas", JSON.stringify(tareas)); //se convierte el objeto tarea a un string para poder almacenarlo set
  } else {
    let tareas = JSON.parse(localStorage.getItem("tareas")); //si hay tareas las traigo de local storage get
    tareas.push(tarea); //actualizo tareas guardandolas en el array
    localStorage.setItem("tareas", JSON.stringify(tareas)); //las vuelvo a almacenar en localstorage
  }

  obtenerTareas();
  document.getElementById("formTarea").reset();
  e.preventDefault(); //no queremos que se recargue la pagina automaticamente
}

function borrarTarea(titulo) {
  console.log(titulo);
  let tareas = JSON.parse(localStorage.getItem("tareas")); //se obtiene las tareas y trasforman en un array de objetos
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].titulo == titulo) {
      //busco la tarea que el titulo coincida conn el titulo
      tareas.splice(i, 1); // se saca la tarea que coincide se corta el array en el lugar que coincide
    }
  }
  localStorage.setItem("tareas", JSON.stringify(tareas)); //se guardan nuevamente en localstorage como string
  obtenerTareas(); //llamamos para refrescar y que no aparezca en la lista la tarea eliminada
}

function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem("tareas")); //se obtinen la tarea almacenadas en localstorage
  // salida por html para desplegar las tareas
  let mostrarTareas = document.getElementById("tareas"); //se obtiene en html el div tareas
  mostrarTareas.innerHTML = ""; //en caso de tener algun listado anterior se limpia

  for (let i = 0; i < tareas.length; i++) {
    let titulo = tareas[i].titulo; //almacena el varlor de titulo en tareas con el indice i
    let descripcion = tareas[i].descripcion; //almacena el varlor de descripcion en tareas con el indice i
    //se recorre el array tareas
    // se sacan las variables en un
    mostrarTareas.innerHTML += `<div class="card mb-3">  
    <div class="card-body">
          <p>${titulo} - ${descripcion}
          <a href="#" onclick="borrarTarea('${titulo}')" class="btn btn-danger ml-5">Borrar</a>
          </p>
        </div>
      </div>`;

    //se agrega el listado de tareas en el div tareas ver += para ir agregando sin borrarlas
    // se llama a borrarTarea en el evento click del boton se le pasa el titulo
  }
}
obtenerTareas(); //se llama a la funcion obtener tareas al cargar el navegador
