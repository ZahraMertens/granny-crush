const searchHandler = async (event) => {
    event.preventDefault();

    const minAgeDoprdown = document.getElementById('search-age1')
    const minAge = minAgeDoprdown.options[minAgeDoprdown.selectedIndex].value;
    console.log(minAge)

    const maxAgeDoprdown = document.getElementById('search-age2')
    const maxAge = minAgeDoprdown.options[maxAgeDoprdown.selectedIndex].value;
    console.log(maxAge)

    const postcode = document.querySelector('#search-postcode').value.trim();
    console.log(postcode)

    const genderDoprdown = document.getElementById('search-gender')
    const gender = genderDoprdown.options[genderDoprdown.selectedIndex].value;
    console.log(gender)

    if (minAge && maxAge && postcode && gender) {
      const res = await fetch('/api/users/search', {
        method: 'POST',
        body: JSON.stringify({minAge, maxAge, postcode, gender}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        document.location.replace('/results');
      } else {
        document.location.replace('/sarch')
        alert("There are no matches!")
      }
    }
}



function createDropdownOpt () {
    const startAge = 60;
    var optTag;

    for (var i = startAge; i < startAge + 35; i++){
        optTag += `<option value="${i}">${i}</option>`
    }

    //Add filter so when first value selected second calue cant be larger than first
    document.getElementById('search-age2').innerHTML = optTag;
    document.getElementById('search-age1').innerHTML = optTag;
}


createDropdownOpt();
document.querySelector('.search-form').addEventListener("submit", searchHandler);    