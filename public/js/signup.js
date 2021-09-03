
const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-username').value.trim();
    console.log(name)
    const email = document.querySelector('#signup-email').value.trim();
    console.log(email)
    // Get Value from gender Dropdown
    const genderDoprdown = document.getElementById('signup-gender')
    const gender = genderDoprdown.options[genderDoprdown.selectedIndex].value;
    console.log(gender)
    // Get value from age dropdown
    const ageDoprdown = document.getElementById('signup-age')
    const age = ageDoprdown.options[ageDoprdown.selectedIndex].value;
    console.log(age)

    const phone = document.querySelector('#signup-phone').value.trim();
    console.log(phone)

    const postcode = document.querySelector('#signup-postcode').value.trim();
    console.log(postcode)

    const fun_fact = document.querySelector('#signup-fact').value.trim();
    console.log(fun_fact)
    
    const hobby_name = document.querySelector("input[type='radio'][name='answer']:checked").value;
    console.log(hobby_name)

    const password = document.querySelector('#signup-password').value.trim();
    console.log(password)

    if (name && email && gender && age && phone && postcode && fun_fact && password) {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, gender, age, phone, postcode, fun_fact, password, hobby_name}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
}

function createDropdownOpt () {
    const startAge = 60;
    var optTag;

    for (var i = startAge; i < startAge + 35; i++){
        optTag += `<option value="${i}">${i}</option>`
    }

    document.getElementById('signup-age').innerHTML = optTag;
}

createDropdownOpt();
document.querySelector('.signup-form').addEventListener("submit", signupHandler);    