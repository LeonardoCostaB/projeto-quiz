import Modal from './modal.js'
const modal= Modal()

/*--Alternando para confirmar ou excluir--*/

const modalTitle = document.querySelector('.modal h2')
const modalText = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

function alternating (event, check = true) {
  
  const text = check ? 'Marcar como lida' : 'Excluir'
  const slug = check ? 'check' : 'delete'
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  /*const id = document.querySelector('#room header .button-border-blue')
  id.setAttribute('data-id', `${roomId}`)
  id.innerHTML= `${roomId}`*/

  modalTitle.innerHTML = `${text} esta pergunta`
  modalText.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta`
  modalButton.innerHTML = check ? 'Sim, salvar' : `Sim, ${text}`
  check ? modalButton.classList.add('blue') : modalButton.classList.remove('blue')

  modal.open()
}

/*-----Open-Close Modal----*/

const checkButtons = document.querySelectorAll('.check-delete #check')

checkButtons.forEach(button => {
  button.addEventListener('click', (event) => alternating(event, check))
})

const deleteButtons = document.querySelectorAll('.check-delete #delete')

deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => alternating(event, false))
})

const cancellButtons = document.querySelectorAll('.buttons-modal #cancell')

cancellButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault()
    
    modal.close()
  })
})

