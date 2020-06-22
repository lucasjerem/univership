
//Affichage du nom d'utilisateur
const adminName = localStorage.getItem('name');
if (adminName !== null){
    document.querySelector('.admin-name').textContent = adminName.replace("."," ");
}

// déconnexion d'un compte
document.querySelector('#disconnect').addEventListener('click', ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('rgpd');
    window.location.href = "../index.html";
});