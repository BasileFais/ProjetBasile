document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement | null;

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            // Rediriger vers la page login.html
            window.location.href = "login.html";  // La page login.html est dans le même dossier
        });
    }
});
