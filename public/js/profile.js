const deletePostHandler = async (event) => {
    event.preventDefault();

   
    //MAybe conform delete before delete!
    if(event.target.hasAttribute('data-id')){

    const user_id = event.target.getAttribute('data-id');
    console.log(user_id)
    
      const res = await fetch(`/api/users/${user_id}`, {
        method: "DELETE",
        });
    
        console.log("success")
    
        if(res.ok){
            console.log("Deleted Account")
            alert("Your account has successfuly been deleted")
            document.location.replace("/login")
        } else {
            alert(res.error)
        } 
    }
    
}

document.getElementById('deleteTag').addEventListener("click", deletePostHandler);