const formularioForm = document.getElementById("form-modal-notas");
const tituloInput = document.getElementById("titulo");
const contenidoInput = document.getElementById("contenido");
const notasTable = document.getElementById("tabla");
const editarForm = document.getElementById("formularioEditar");
const editarTituloInput = document.getElementById("editarTitulo");
const editarContenidoInput = document.getElementById("editarContenido");
const json = localStorage.getItem("notas"); // Traer de localStorage el dato asociado a la key usuarios.

const data = JSON.parse(json); // Convertir datos de un string JSON a código JavaScript.
let notas = data || [];
let notaId = "";

function generarID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
// formularioForm.onsubmit = function (e) {
function submitFormulario(e) {
  //funcion que guarda en json lo que se ingresa en el form
  e.preventDefault();
  const nota = {
    id: generarID(),
    titulo: tituloInput.value,
    contenido: contenidoInput.value,
  };
  notas.push(nota);
  const json = JSON.stringify(notas); // Convertir datos a un string JSON.
  localStorage.setItem("notas", json); // Guardar en localStorage un dato asociado a la key "usuarios".
  mostrarNotas();
  formularioForm.reset();
}

function mostrarNotas() {
  const notasMap = notas.map(function (nota) {
    return `
        <tr>
            <td>${nota.titulo}</td>
            <td>${nota.contenido}</td>
            <td>
              <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger btn-sm">Eliminar</button>
              <button onclick="mostrarDetalle('${nota.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mDetalles">Detalles</button>
              <button onclick="cargarModalEditar('${nota.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
              data-bs-target="#modalEditar">Editar</button>
            </td> 
        </tr>
        `;
  });
  notasTable.innerHTML = notasMap.join("");
}
mostrarNotas();

function eliminarNota(id) {
  const confirmar = confirm("Confirme para eliminar Nota.");
  if (!confirmar) {
    return;
  }
  let notasFiltradas = [];
  for (let i = 0; i < notas.length; i++) {
    const nota = notas[i];
    const coincideId = nota.id === id;
    if (!coincideId) {
      notasFiltradas.push(nota);
    }
  }
  const json = JSON.stringify(notasFiltradas);
  localStorage.setItem("notas", json);
  notas = notasFiltradas;
  console.log("Se eliminó exitosamente la Nota. 👨‍💻");
  mostrarNotas();
}

function mostrarDetalle(id) {
  const notaEncontrada = notas.find((nota) => nota.id === id);
  const cuerpoNota = document.getElementById("detalleNota");
  const fecha = new Date(notaEncontrada.registro);
  const NotesDetalles = `
  <p>Titulo: ${notaEncontrada.titulo}</p>
  <p>Nota: ${notaEncontrada.contenido}</p>
  <p>Fecha de registro: ${fecha.toLocaleString()}</p> 
  `;
  cuerpoNota.innerHTML = NotesDetalles;
}

function cargarModalEditar(id) {
  // Buscar la nota en el array usando el método find().
  const notaEncontrada = notas.find((nota) => nota.id === id);
  editarTituloInput.value = notaEncontrada.titulo;
  editarContenidoInput.value = notaEncontrada.contenido;
  // Actualizar el valor de la variable global notaId, con el id del usuario encontrado.
  notaId = notaEncontrada.id;
}

// Esta función carga los datos dela nota seleccionada,
// en los campos del formulario del documento HTML.
function cargarModalEditar(id) {
  // Buscar nota en el array usando el método find().
  const notaEncontrada = notas.find((nota) => nota.id === id);
  editarTituloInput.value = notaEncontrada.titulo;
  editarContenidoInput.value = notaEncontrada.contenido;
  // Actualizar el valor de la variable global notaId, con el id de nota encontrado.
  notaId = notaEncontrada.id;
}

// Al evento submit del formulario de edición le asignamos esta función,
// que actualiza al usuario seleccionado, con los datos ingresados.
function editarNota(e) {
  e.preventDefault();
  // Actualizar una nota del array, usando map().
  const notasModificado = notas.map((nota) => {
    // Usamos el id de la nota guardado en notaId,
    // para modificar solo a la nota que coincida con este.
    if (nota.id === notaId) {
      // Usar spread syntax para copiar las propiedades de un objeto a otro.
      const notasModificado = {
        ...nota,
        titulo: editarTituloInput.value,
        contenido: editarContenidoInput.value,
      };
      return notasModificado;
    } else {
      // Retornar la nota sin modificar en los casos que no coincida el id.
      return nota;
    }
  });
  const json = JSON.stringify(notasModificado);
  // Guardar lista de notas en localStorage.
  localStorage.setItem("notas", json);
  notas = notasModificado;
  console.log("Se modificó exitosamente un usuario. 👨‍💻");
  mostrarNotas();
  // Ocultar el modal con las funciones incluidas en bootstrap.
  const modalDiv = document.getElementById("modalEditar");
  const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
  modalBootstrap.hide();
}
mostrarNotas();
formularioForm.onsubmit = submitFormulario;
editarForm.onsubmit = editarNota;
