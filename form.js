import { Address } from './Address.js';
import { getJson } from './request.js';
import * as list from './list.js'

function State(){
    this.address = new Address()

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputNumber = null;
    this.inputStreet = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;

}

const state = new State()

export function init(){

   state.inputCep = document.forms['form-address'].cep;
   state.inputNumber = document.forms['form-address'].number;
   state.inputStreet = document.forms['form-address'].street;
   state.inputCity = document.forms['form-address'].city;

   state.btnSave = document.forms['form-address'].btnSave;
   state.btnClear = document.forms['form-address'].btnClear;

   state.errorCep = document.querySelector('[data-error="cep"]')
   state.errorNumber = document.querySelector('[data-error="number"]')

    state.btnClear.addEventListener('click', handleClearClick)
    state.btnSave.addEventListener('click', handlebtnSaveCilck)
    
    state.inputCep.addEventListener('change', handleInputCepChange)
    state.inputNumber.addEventListener('keyup', handleInputNumber)
    console.log(state)
}
function handlebtnSaveCilck(event){
    event.preventDefault()
    const errors = getErrors(state.address)
    console.log(errors)
    const keys = Object.keys(errors)
    if(keys.length > 0){
       keys.forEach((x)=>{
        setFormError(x, errors[x])
       })
    }
    else{
        list.addCard(state.address)
        clearForm()
    }
}

async function handleInputCepChange(event){
    event.preventDefault()
    try{
        const cep = event.target.value;
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const data = await getJson(url)
        const address = new Address(data.cep, data.logradouro, null, data.localidade)
        state.address = address;
        state.inputCep.value = address.cep
        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        setFormError("cep", "")
        state.inputNumber.focus()
        console.log(address)
    } catch (e){
        setFormError("cep", "campo invalido")
    }
}


function handleInputNumber(event){
    if(event.target.value == ""){
        setFormError("number", "cep requerido")
    }
    else{
        state.address.number = event.target.value
        setFormError("number", "")
    }
}

function handleClearClick(event){
    event.preventDefault();

    clearForm();
}
function clearForm(){

    state.inputCep.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "")
    setFormError("number", "")

    state.inputCep.focus()

    state.address = new Address()
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);    
    element.innerHTML = value;
}

function getErrors(address){
    const errors = {}

    if(!address.cep || address.cep == ""){
        errors.cep = "campo requerido"
    }
    if(!address.number || address.number == ""){
        errors.number = "campo requerido"
    }
    return errors
}