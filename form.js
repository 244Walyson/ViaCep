
function state(){
    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputNumber = null;
    this.inputStreet = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}
const state = new state()

export function init(){

   state.inputCep = document.forms['form-address'].cep;
   state.inputNumber = document.forms['form-address'].number;
   state.inputStreet = document.forms['form-address'].street;
   state.inputCity = document.forms['form-address'].city;

   state.btnSave = document.forms['form-address'].btnSave;
   state.btnClear = document.forms['form-address'].btnClear;

   state.errorCep = document.querySelector('[data.error="cep"]')
   state.errorCep = document.querySelector('[data.error="number"]')
}