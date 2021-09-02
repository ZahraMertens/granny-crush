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
            // console.log("Response ok")
            document.location.replace("/homepage")
        } else {
            alert(res.error)
        }
    }
}

document.querySelector('.login-btn').addEventListener("click", loginHandler);