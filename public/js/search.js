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
        const mainContainer = $('.search-main')
        var newDiv = $("<div class='results-card-container column is-two-thirds'>");
        mainContainer.append(
          `<div class="column result-animation">
             <p class="result-title result-title1 title is-1">Ready ?</p>
             <p class="result-title result-title2 title is-1"> Match !</p>
             <P class="result-title result-title3 title is-1"> Go !</P>
          </div>`)
        mainContainer.append(newDiv);
        mainContainer.addClass('results-main');
        // const imgSearch = $('#search-heart-img');
        // imgSearch.addClass('result-heart-img')
        const imgContainer = $('.search-header').remove()
        


        for (let i = 0; i < searchResults.length; i++){
          console.log(searchResults[i].name)
          console.log(searchResults[i].associated_hobbies[0].hobby_name) //Only returning the first hoppy in array
          //Append div to /search handlebars
          newDiv.append(`<div class="card-profile card">
          <div class="card-image">
            <figure class="image-container image is-4by3">
              <img class="profile-img" src="/images/${searchResults[i].filename}" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content result-card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${searchResults[i].name}, ${searchResults[i].age}</p>
                <p class="result-span-card">${searchResults[i].gender}</p>
                <br>
                <p class=""><span class="result-span-card">Email: </span>${searchResults[i].email}</p>
                <p class=""><span class="result-span-card">Phone: </span>${searchResults[i].phone}</p>
                <p class=""><span class="result-span-card">Postcode: </span>${searchResults[i].postcode}</p>
                <p class=""><span class="result-span-card">Hobbies: </span>${searchResults[i].associated_hobbies[0].hobby_name}</p>
              </div>
            </div>
            <div class="content">
              <p class=""><span class="result-span-card">Fun Fact: </span>${searchResults[i].fun_fact}</p>
            </div>
          </div>
         </div>`);
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