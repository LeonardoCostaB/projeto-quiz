export default function Modal() { 

  const modalOverlay = document.querySelector('.modal-overlay')

  function open(){
    modalOverlay
      .classList.add('active')
  }
  function close() {
    modalOverlay
        .classList.remove('active')
  }
  
  return {open, close}
}