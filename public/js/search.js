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

      // const res = await fetch(`/api/users/search/${minAge}/${maxAge}/${gender}/${postcode}`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // })

      const res = await fetch('/api/users/search', {
        method: 'POST',
        body: JSON.stringify({minAge, maxAge, postcode, gender}),
        headers: { 'Content-Type': 'application/json' },
      })
  
      if (res.ok) {
        // returns search results based on inputted data
        const searchResults = await res.json()
        console.log(searchResults)
        
        const searchForm = document.querySelector('.search-form').remove();

        for (let i = 0; i < searchResults.length; i++){
          console.log(searchResults[i].name)
          //Append div to /search handlebars
          ``
        }

        // return searchResults
        // document.location.replace('/results');
      } else {
        // document.location.replace('/search')
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