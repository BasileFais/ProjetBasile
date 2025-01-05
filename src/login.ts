document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form") as HTMLFormElement | null;

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = (document.getElementById("username") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;

            // Vérification des identifiants
            if (username === "1234" && password === "1234") {
                // Sauvegarde dans localStorage pour marquer la connexion
                localStorage.setItem("isConnected", "true");

                // Afficher un message de succès
                alert("Connexion réussie !");

                // Redirection vers la page liste
                window.location.href = "listes.html"; // Assurez-vous que l'URL de la page liste est correcte
            } else {
                alert("Identifiants incorrects.");
            }
        });
    }
});
