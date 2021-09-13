const deleteHandler = async (event) => {
    event.preventDefault();

    let confirm = window.confirm("Are you sure you want to delete your account?")

    if(confirm){
        if(event.target.hasAttribute('data-id')){

        const user_id = event.target.getAttribute('data-id');
        
        const res = await fetch(`/api/users/${user_id}`, {
            method: "DELETE",
        });
        
            if(res.ok){
                console.log("Deleted Account")
                alert("Your account has successfuly been deleted")
                document.location.replace("/login")
            } else {
                alert(res.error)
            } 
        }

    } else {
        document.location.replace(`/profile`)
    }
    
}

const updateHandler = async (event) => {
    event.preventDefault();

    if(event.target.hasAttribute('data-id')){

        //Getting all values from input fields
        const user_id = event.target.getAttribute('data-id');
        const name = document.querySelector("#edit-name").value.trim();
        const age = document.querySelector("#edit-age").value.trim();
        const gender = document.querySelector("#edit-gender").value.trim();
        const email = document.querySelector("#edit-email").value.trim();
        const phone = document.querySelector("#edit-phone").value.trim();
        const postcode = document.querySelector("#edit-postcode").value.trim();
        const fun_fact = document.querySelector("#edit-fact").value.trim();
        const hobby_name = document.querySelector("input[type='radio'][name='answer']:checked").value;
        
        if (name && age && gender && email && phone && postcode && fun_fact && hobby_name){
            const res = await fetch(`/api/users/${user_id}`, {
                method: "PUT",
                body: JSON.stringify({name, age, gender, email, phone, postcode, fun_fact, hobby_name}),
                headers: { 'Content-Type': 'application/json' },
            });

            if(res.ok){
                document.location.replace(`/profile`)
            } else {
                alert("Sorry it looks like there is a mistake with your inputs. Please check and try again...")
            }
        }
    }
}

//Gets file name from files and display in input field
const fileInput = document.querySelector('#file-js-example input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        const fileName = document.querySelector('#file-js-example .file-name');
        fileName.textContent = fileInput.files[0].name;
        return fileInput.files[0].name
    }
}

document.getElementById('deleteTag').addEventListener("click", deleteHandler);
document.getElementById("editProfile-btn-save").addEventListener("click", updateHandler);

