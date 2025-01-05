"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche la soumission du formulaire par défaut
            console.log("Form submitted");
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            console.log("Username:", username);
            console.log("Password:", password);
            // Vérification des identifiants admin
            if (username === "1234" && password === "1234") {
                console.log("Connexion réussie");
                // Sauvegarde de l'état de connexion dans localStorage
                localStorage.setItem("isConnected", "true");
                alert("Connexion réussie !");
                window.location.href = "listes.html"; // Redirige vers listes.html après connexion
            }
            else {
                // Affichage du message d'erreur si les identifiants sont incorrects
                console.log("Identifiants incorrects");
                var errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Identifiants incorrects.";
            }
        });
    }
});
