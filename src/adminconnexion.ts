document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form") as HTMLFormElement | null;

    if (loginForm) {
        loginForm.addEventListener("submit", (event: Event) => {
            event.preventDefault(); // Empêche la soumission du formulaire par défaut
            console.log("Form submitted");

            const username = (document.getElementById("username") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;
            
            console.log("Username:", username);
            console.log("Password:", password);

            // Vérification des identifiants admin
            if (username === "1234" && password === "1234") {
                console.log("Connexion réussie");
                // Sauvegarde de l'état de connexion dans localStorage
                localStorage.setItem("isConnected", "true");
                alert("Connexion réussie !");
                window.location.href = "listes.html"; // Redirige vers listes.html après connexion
            } else {
                // Affichage du message d'erreur si les identifiants sont incorrects
                console.log("Identifiants incorrects");
                const errorMessage = document.getElementById("error-message") as HTMLElement;
                errorMessage.textContent = "Identifiants incorrects.";
            }
        });
    }
});
