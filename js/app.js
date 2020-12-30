//Variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
    //Variables para campos
    const email = document.querySelector('#email');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');

//Listeners
eventListeners();

function eventListeners(){
    //Cuando la APP arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
}

//Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){

    if(e.target.value.length >0 ){
        mostrarCorrecto(e);
    } else{
        mostrarError('Todos los camos son obligatorios', e);
    }

    if(e.target.type === 'email'){
        const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(er.test(e.target.value)){
            mostrarCorrecto(e);
        } else{
            mostrarError('Debes ingresar un Email Correcto', e);
        }
    }
}

function mostrarCorrecto(e){
    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
    if(document.querySelectorAll('.error').length > 0){
        const errorMessage = document.querySelector('.error');
        errorMessage.remove();
    }
}

function mostrarError(mensaje, e){
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;scrollX
    mensajeError.classList.add('border','border-red-500','background-color-100','text-red-500','p-3','error', 'mt-5','text-center');
    if (document.querySelectorAll('.error').length === 0){
        formulario.appendChild(mensajeError);
    }
}