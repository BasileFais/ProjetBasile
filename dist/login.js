"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            // Vérification des identifiants
            if (username === "1234" && password === "1234") {
                // Sauvegarde dans localStorage pour marquer la connexion
                localStorage.setItem("isConnected", "true");
                // Afficher un message de succès
                alert("Connexion réussie !");
                // Redirection vers la page liste
                window.location.href = "listes.html"; // Assurez-vous que l'URL de la page liste est correcte
            }
            else {
                alert("Identifiants incorrects.");
            }
        });
    }
});
