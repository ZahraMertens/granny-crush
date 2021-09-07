
function handleClose (event) {
  event.preventDefault();
  console.log("close")
  document.location.replace('/search')
//   $('.modal').removeClass('is-active') //Close modal
//   document.location.reload(); //To remove input
};

document.querySelector('.modal-close-button').addEventListener("click", handleClose);