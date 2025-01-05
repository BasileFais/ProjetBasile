"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            // Rediriger vers la page login.html
            window.location.href = "login.html"; // La page login.html est dans le même dossier
        });
    }
});
