const createMatch = async (event) => {
     event.preventDefault();

    if(event.target.hasAttribute('data-id')){

    const match_id = event.target.getAttribute('data-id');
        
        if (match_id){
            const res = await fetch(`/api/matches/`, {
                method: "POST",
                body: JSON.stringify({match_id}),
                headers: { 'Content-Type': 'application/json' },
            });

            if(res.ok){
                document.location.reload();
            } else {
                document.location.reload();
            }
        }
    }
}

$('.results-card-container').on("click", ".match-button", createMatch); 