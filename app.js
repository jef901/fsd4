const formulario = document.getElementById("formulario");
const listaTareas = document.getElementById("lista-tareas");
//const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
let tareas = {
  1: {
    id: 1,
    texto: "Tarea 1",
    estado: false,
  },
  2: {
    id: 2,
    texto: "Tarea 2",
    estado: false,
  },
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target[0].value);
  console.log(e.target.querySelector("input").value);
  setTarea(e); //agrega tarea
});

const setTarea = e => {
    const texto = e.target.querySelector('input').value
    
    if (texto.trim() === '') {
        console.log('está vacio')
        return
    }
    const tarea = {
        id: Date.now(),
        texto: texto,
        estado: false
    }
    
    tareas[tarea.id] = tarea
  //  pintarTareas()

    formulario.reset()
    e.target.querySelector('input').focus()
}
