
const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    // Get Value from gender Dropdown
    const genderDoprdown = document.getElementById('signup-gender')
    const gender = genderDoprdown.options[genderDoprdown.selectedIndex].value;
    // Get value from age dropdown
    const ageDoprdown = document.getElementById('signup-age')
    const age = ageDoprdown.options[ageDoprdown.selectedIndex].value;

    const phone = document.querySelector('#signup-phone').value.trim();
    const postcode = document.querySelector('#signup-postcode').value.trim();
    const fun_fact = document.querySelector('#signup-fact').value.trim();
    const hobby_name = document.querySelector("input[type='radio'][name='answer']:checked").value;
    const password = document.querySelector('#signup-password').value.trim();

    if (name && email && gender && age && phone && postcode && fun_fact && password && hobby_name) {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, gender, age, phone, postcode, fun_fact, password, hobby_name}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        document.location.replace('/');
      } else {
        alert("OOOPS... It looks like your input type was not correct. Please try again.");
      }
    } else{
      alert("Please make sure you provide all the required information!")
    }
}

//Loop over age to display dropdown values
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