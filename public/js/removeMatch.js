const createMatch = async (event) => {
    event.preventDefault();

   if(event.target.hasAttribute('data-id')){

   const user_id = event.target.getAttribute('data-id');
       
       if (user_id){
           
        const res = await fetch(`/api/matches/${user_id}`, {
            method: "DELETE",
        });

           if(res.ok){
               document.location.replace(`/match`)
           } else {
               document.location.replace(`/match`)
           }
       }
   }
}

$('.results-card-container').on("click", ".remove-match-btn", createMatch); 