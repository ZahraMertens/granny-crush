const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-username').value.trim();
    console.log(name)
    const email = document.querySelector('#signup-email').value.trim();
    const gender = document.querySelector('#signup-gender').text
    console.log(gender)

    // const password = document.querySelector('#signup-password').value.trim();
  
    // if (username && email && password) {
    //   const res = await fetch('/api/users/signup', {
    //     method: 'POST',
    //     body: JSON.stringify({ username, email, password }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
  
    //   if (res.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert(response.statusText);
    //   }
    // }
}

document.querySelector('.signup-form').addEventListener("submit", signupHandler);