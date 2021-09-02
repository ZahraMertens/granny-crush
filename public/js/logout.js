const logoutBtn = document.querySelector("#btn-logout");

const handleLogout = async () => {
    const res = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (res.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}

logoutBtn.addEventListener("click", handleLogout)