const createMatch = async (event) => {
     event.preventDefault();

    if(event.target.hasAttribute('data-id')){

    const match_id = event.target.getAttribute('data-id');
    console.log(match_id)
        
        if (match_id){
            const res = await fetch(`/api/matches/`, {
                method: "POST",
                body: JSON.stringify({match_id}),
                headers: { 'Content-Type': 'application/json' },
            });

            if(res.ok){
                document.location.replace(`/match`)
            } else {
                document.location.replace(`/match`)
            }
        }
    }
}

$('.results-card-container').on("click", ".match-button", createMatch); 
console.log("test")