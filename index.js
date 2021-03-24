const formularioForm = document.getElementById("form-modal-notas");
const tituloInput = document.getElementById("titulo");
const contenidoInput = document.getElementById("contenido");
const notasTable = document.getElementById("tabla");
const json = localStorage.getItem("notas"); // Traer de localStorage el dato asociado a la key usuarios.

const data = JSON.parse(json); // Convertir datos de un string JSON a código JavaScript.
let notas = data || [];

function generarID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
formularioForm.onsubmit = function (e) {
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
};

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
mostrarNotas();
