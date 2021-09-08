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

      document.location.replace(`/api/users/search/${minAge}/${maxAge}/${gender}/${postcode}`) 
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // })

      // const res = await fetch('/api/users/results', {
      //   method: 'POST',
      //   body: JSON.stringify({minAge, maxAge, postcode, gender}),
      //   headers: { 'Content-Type': 'application/json' },
      // })
  
      // if (res.ok) {
      //   // const searchResults = await res.json()
      //   console.log(res)
      // } else {
      //     console.log(res)
      //   }
      //   // returns search results based on inputted data
        
      //   const searchForm = document.querySelector('.search-form').remove();
      //   const mainContainer = $('.search-main')
      //   var newDiv = $("<div class='results-card-container column is-two-thirds'>");
      //   mainContainer.append(
      //     `<div class="column result-animation">
      //        <p class="result-title result-title1 title is-1">Ready ?</p>
      //        <p class="result-title result-title2 title is-1"> Match !</p>
      //        <P class="result-title result-title3 title is-1"> Go !</P>
      //     </div>`)
      //   mainContainer.append(newDiv);
      //   mainContainer.addClass('results-main');
      //   // const imgSearch = $('#search-heart-img');
      //   // imgSearch.addClass('result-heart-img')
      //   const imgContainer = $('.search-header').remove()
        
      //   for (let i = 0; i < searchResults.length; i++){
      //     console.log(searchResults[i].name)
      //     console.log(searchResults[i].hobby.hobby_name) //Only returning the first hoppy in array
      //     //Append div to /search handlebars
      //     newDiv.append(`<div class="card-profile card">
      //     <div class="card-image">
      //       <figure class="image-container image is-4by3">
      //         <img class="profile-img" src="/images/${searchResults[i].filename}" alt="Placeholder image">
      //       </figure>
      //     </div>
      //     <div class="card-content result-card-content">
      //       <div class="media">
      //         <div class="media-content">
      //           <button class="button is-danger py-1 data-id:"${searchResults[i].id}">
      //             <i class="fas fa-heart fa-2x"></i>
      //            </button>
      //           <p class="title is-4">${searchResults[i].name}, ${searchResults[i].age}</p>
      //           <p class="result-span-card">${searchResults[i].gender}</p>
      //           <br>
      //           <p class=""><span class="result-span-card">Postcode: </span>${searchResults[i].postcode}</p>
      //           <p class=""><span class="result-span-card">Hobbies: </span>${searchResults[i].hobby.hobby_name}</p>
      //         </div>
      //       </div>
      //       <div class="content">
      //         <p class=""><span class="result-span-card">Fun Fact: </span>${searchResults[i].fun_fact}</p>
      //       </div>
      //     </div>
      //    </div>`);
      //   };

      // // } else {
      // //   $('.modal').addClass('is-active')
      // // }
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

// function handleClose (event) {
//   event.preventDefault();
//   console.log("close")
//   $('.modal').removeClass('is-active') //Close modal
//   document.location.reload(); //To remove input
// };

// document.querySelector('.modal-close-button').addEventListener("click", handleClose);
createDropdownOpt();
document.querySelector('.search-form').addEventListener("submit", searchHandler);    