/*** VARIABLES ***/
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");
const btnReset = document.querySelector("#resetBtn");
//Expresión regular
const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

/*** OBJETO COLORES INPUTS***/
    //Se invoca al metodo del objeto y se le manda el ID del campo al cual se quieren retirar o agregar las clases de error o de correcto
const coloresInput = {
    verdeActivado: (id) => {
        const elemento = document.getElementById(`${id}`);
        elemento.classList.add("border", "border-green-500");
    },
    verdeDesactivado: (id) => {
        const elemento = document.getElementById(`${id}`);
        elemento.classList.remove("border", "border-green-500");
    },
    rojoActivado: (id) => {
        const elemento = document.getElementById(`${id}`);
        elemento.classList.add("border", "border-red-500");
    },
    rojoDesactivado: (id) => {
        const elemento = document.getElementById(`${id}`);
        elemento.classList.remove("border", "border-red-500");
    },
};


/*** lISTENERS ***/
eventListeners();

function eventListeners() {
    //Cuando la APP arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //Campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    //Botones
    btnEnviar.addEventListener("click", enviarMensaje);
    btnReset.addEventListener("click", resetearFormulario);
}

/*** FUNCIONES ***/

//Cuando carga el documento y se bloquea el botón
function iniciarApp() {
    bloquearBoton(true);
}

//Valida cuando salen del input
function validarFormulario(e) {
    //Evaluan el contenido dentro de los campos
    //Para el campo del asunto y del mensaje
    if (e.target.value.length > 0) {
        mostrarCorrecto(e);
    } else {
        mostrarError("Todos los camos son obligatorios", e);
    }
    //Para el campo del email
    if (e.target.type === "email") {
        if (er.test(e.target.value)) {
            mostrarCorrecto(e);
        } else {
            mostrarError("Debes ingresar un Email Correcto", e);
        }
    }
    //Verificacion si todos los campos son correctos para desbloquear el boton
    if (er.test(email.value) && asunto.value != "" && mensaje.value != "") {
        bloquearBoton(false);
    } else {
        bloquearBoton(true);
    }
}

//En caso que lo que haya sido colocado sea correcto
function mostrarCorrecto(e) {
    coloresInput.rojoDesactivado(e.target.id);
    coloresInput.verdeActivado(e.target.id);
    if (document.querySelectorAll(".error").length > 0) {
        const errorMessage = document.querySelector(".error");
        errorMessage.remove();
    }
}
//En caso que lo que haya sido colocado sea incorrecto
function mostrarError(mensaje, e) {
    coloresInput.verdeDesactivado(e.target.id);
    coloresInput.rojoActivado(e.target.id);
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        "border",
        "border-red-500",
        "background-color-100",
        "text-red-500",
        "p-3",
        "error",
        "mt-5",
        "text-center"
    );
    if (document.querySelectorAll(".error").length === 0) {
        formulario.appendChild(mensajeError);
    }
}

//Funcion que bloquea o desbloquea el botón según el parámetro que se le envia
function bloquearBoton(activado) {
    const boton = activado;
    if (boton === true) {
        btnEnviar.disabled = true;
        btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
    } else if (boton === false) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

//Enviar mensaje
function enviarMensaje(e) {
    e.preventDefault();
    //Se activa el Spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";
    //Se coloca un tiempo específico para desaparecer el spinner y luego colocar un texto
    setTimeout(() => {
        spinner.style.display = "none";
        const mensajeEnviado = document.createElement("p");
        mensajeEnviado.textContent = "El mensaje ha sido enviado con éxito";
        mensajeEnviado.classList.add(
            "text-center",
            "my-10",
            "p-2",
            "bg-green-500",
            "text-white",
            "font-bold",
            "uppercase"
        );
        formulario.insertBefore(mensajeEnviado, spinner);

        setTimeout(() => {
            mensajeEnviado.remove();
            resetearFormulario("AppFinalizada");
        }, 5000);
    }, 3000);
}

//Resetear formulario
function resetearFormulario(e) {
    //Verifica si la app es llamada desde el botón de Reset o porque finalizo la app
    if (e !== "AppFinalizada") {
        e.preventDefault();
    }
    //Reinicia los estilos
    formulario.reset();
    resetearEstilos();
    iniciarApp();
}

//Resetear los estilos
function resetearEstilos() {
    //Busca los elementos que tengan la clase 'inputCampo' que se refiere a a todos los inputs y textarea que hay
    const estilosDeError = document.querySelectorAll(".inputCampo");
    //Se recorren los elementos para buscar si hay alguno con las clases de error o correcto y si los hay se desactivan
    estilosDeError.forEach((elemento) => {
        if (elemento.classList.contains("border-red-500")) {
            coloresInput.rojoDesactivado(elemento.id);
        } else if (elemento.classList.contains("border-green-500")) {
            coloresInput.verdeDesactivado(elemento.id);
        }
    });
    //Se busca la etiqueta P y si contiene la clase de error se elimina
    const mensajeError = document.querySelector("p");
    if (mensajeError.classList.contains("border-red-500")) {
        mensajeError.remove();
    }
}
