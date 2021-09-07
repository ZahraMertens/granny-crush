const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();
    
    if (email && password){
        const res = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(res.ok){
            document.location.replace("/")
        } else {
            $('.modal').addClass('is-active')
        }
    }
}

function handleClose (event) {
    event.preventDefault();
    console.log("close")
    $('.modal').removeClass('is-active')
};

document.querySelector('.login-btn').addEventListener("click", loginHandler);
document.querySelector('.modal-close-btn').addEventListener("click", handleClose);