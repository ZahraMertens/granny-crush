const searchHandler = async (event) => {
    event.preventDefault();

    const minAgeDoprdown = document.getElementById('search-age1')
    const minAge = minAgeDoprdown.options[minAgeDoprdown.selectedIndex].value;

    const maxAgeDoprdown = document.getElementById('search-age2')
    const maxAge = minAgeDoprdown.options[maxAgeDoprdown.selectedIndex].value;

    const postcode = document.querySelector('#search-postcode').value.trim();

    const genderDoprdown = document.getElementById('search-gender')
    const gender = genderDoprdown.options[genderDoprdown.selectedIndex].value;

    if (minAge && maxAge && postcode && gender) {
        //Initialize GET method in backend
        document.location.replace(`/api/users/search/${minAge}/${maxAge}/${gender}/${postcode}`); 
    };
}

function createDropdownOpt () {
    const startAge = 60;
    var optTag;

    for (var i = startAge; i < startAge + 35; i++){
        optTag += `<option value="${i}">${i}</option>`
    }

    document.getElementById('search-age2').innerHTML = optTag;
    document.getElementById('search-age1').innerHTML = optTag;
}

createDropdownOpt();
document.querySelector('.search-form').addEventListener("submit", searchHandler);    