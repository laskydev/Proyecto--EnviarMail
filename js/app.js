/*** VARIABLES ***/
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');

const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

/*** lISTENERS ***/
eventListeners();

function eventListeners(){
    //Cuando la APP arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
}

/*** FUNCIONES ***/

//Cuando carga el documento y se bloquea el botón
function iniciarApp(){
    bloquearBoton(true);
}

//Valida cuando salen del input
function validarFormulario(e){
    //Evaluan el contenido dentro de los campos
        //Para el campo del asunto y del mensaje
    if(e.target.value.length >0 ){
        mostrarCorrecto(e);
    } else{
        mostrarError('Todos los camos son obligatorios', e);
    }
        //Para el campo del email
    if(e.target.type === 'email'){
        if(er.test(e.target.value)){
            mostrarCorrecto(e);
            
        } else{
            mostrarError('Debes ingresar un Email Correcto', e);
        }
    }
    //Verificacion si todos los campos son correctos para desbloquear el boton
    if (er.test(email.value) && asunto.value != '' && mensaje.value != ''){
        bloquearBoton(false);
    } else{
        bloquearBoton(true);
    }
}

//En caso que lo que haya sido colocado sea correcto
function mostrarCorrecto(e){
    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
    if(document.querySelectorAll('.error').length > 0){
        const errorMessage = document.querySelector('.error');
        errorMessage.remove();
    }
}
//En caso que lo que haya sido colocado sea incorrecto
function mostrarError(mensaje, e){
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-color-100','text-red-500','p-3','error', 'mt-5','text-center');
    if (document.querySelectorAll('.error').length === 0){
        formulario.appendChild(mensajeError);   
    }
}

//Funcion que bloquea o desbloquea el botón según el parámetro que se le envia
function bloquearBoton(activado){
    const boton = activado;
    if (boton === true){
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50'); 
    }  else if(boton === false){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); 
    }
}

