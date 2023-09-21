function State(){
    this.container = null
    this.btnClose = null
    this.btnOpen = null
}

const state = new State()

export function init(){
    state.container = document.querySelector('#modal-contact')
    state.btnClose = document.querySelector('.btn-fechar')
    state.btnOpen = document.querySelector('#contact')

    state.btnClose.addEventListener('click', handleBtnCloseCilck)
    state.btnOpen.addEventListener('click', handleContactLinkClick)
}

export function showModal(){
    state.container.classList.add("active")
}

export function closeModal(){
    state.container.classList.remove("active")
}

function handleBtnCloseCilck(event){
    event.preventDefault()
    closeModal()
}
function handleContactLinkClick(event){
    event.preventDefault()
    showModal()
}