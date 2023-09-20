import { Address } from './Address.js'
import { getJson } from './request.js';

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

    state.inputNumber.addEventListener('change', handleInputNumber)

    state.btnClear.addEventListener('click', handleClearClick)
    state.btnSave.addEventListener('click', handlebtnSaveCilck)
    
    state.inputCep.addEventListener('change', handleInputCepChange)
    console.log(state)
}
async function handlebtnSaveCilck(event){
    
}

async function handleInputCepChange(event){
    event.preventDefault()
    try{
        const cep = event.target.value;
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const data = await getJson(url)
    console.log(data)
    } catch (e){
        setFormError("cep", "campo invalido")
    }
}

function handleInputNumber(event){
    console.log("xxx")
    if(event.target.value == " "){
        setFormError("number", "campo requerido")
    }
    else(
        setFormError("number", "")
    )
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
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);    
    console.log(element)
    element.innerHTML = value;
}
