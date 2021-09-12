
function handleClose (event) {
  event.preventDefault();
  document.location.replace('/search')
};

document.querySelector('.modal-close-button').addEventListener("click", handleClose);