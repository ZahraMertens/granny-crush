const deleteHandler = async (event) => {
    event.preventDefault();

    let confirm = window.confirm("Are you sure you want to delete your account?")

    if(confirm){
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
    } else {
        document.location.replace(`/profile`)
    }
    
}

const updateHandler = async (event) => {
    event.preventDefault();

    if(event.target.hasAttribute('data-id')){

        const user_id = event.target.getAttribute('data-id');
        console.log(user_id)
        const name = document.querySelector("#edit-name").value.trim();
        console.log(name)
        const age = document.querySelector("#edit-age").value.trim();
        console.log(age)
        const gender = document.querySelector("#edit-gender").value.trim();
        console.log(gender)
        const email = document.querySelector("#edit-email").value.trim();
        console.log(email)
        const phone = document.querySelector("#edit-phone").value.trim();
        console.log(phone)
        const postcode = document.querySelector("#edit-postcode").value.trim();
        console.log(postcode)
        const fun_fact = document.querySelector("#edit-fact").value.trim();
        console.log(fun_fact)
        const hobby_name = document.querySelector("input[type='radio'][name='answer']:checked").value;
        console.log(hobby_name)
        
        if (name && age && gender && email && phone && postcode && fun_fact && hobby_name){
            const res = await fetch(`/api/users/${user_id}`, {
                method: "PUT",
                body: JSON.stringify({name, age, gender, email, phone, postcode, fun_fact, hobby_name}),
                headers: { 'Content-Type': 'application/json' },
            });

            if(res.ok){
                document.location.replace(`/profile`)
            } else {
                alert(res.error)
            }
        }
    }
}

document.getElementById('deleteTag').addEventListener("click", deleteHandler);
document.getElementById("editProfile-btn-save").addEventListener("click", updateHandler);

//Gets file name from files
const fileInput = document.querySelector('#file-js-example input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        const fileName = document.querySelector('#file-js-example .file-name');
        fileName.textContent = fileInput.files[0].name;
        return fileInput.files[0].name
    }
}