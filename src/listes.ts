document.addEventListener("DOMContentLoaded", () => {
    const ajoutButton = document.getElementById("ajout-button") as HTMLButtonElement;
    const appareilGrid = document.querySelector("#appareil-grid") as HTMLElement;

    // Vérification de la connexion et des droits d'admin
    const isConnected = localStorage.getItem("isConnected") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    // Masquer le bouton Ajouter un appareil si l'utilisateur n'est pas connecté en tant qu'admin
    if (isConnected && isAdmin) {
        // Si l'utilisateur est connecté et admin, afficher le bouton Ajouter un appareil
        ajoutButton.style.display = "block"; // Affiche le bouton
    } else {
        // Si l'utilisateur n'est pas admin ou pas connecté, masquer le bouton Ajouter un appareil
        ajoutButton.style.display = "none"; // Cache le bouton
    }

    // Fonction pour rediriger vers ajout.html
    ajoutButton.addEventListener("click", () => {
        window.location.href = "ajout.html";  // Redirige vers la page ajout.html
    });

    // Chargement des appareils depuis le fichier JSON
    fetch('cameras_data.json')  // Assurez-vous que le chemin est correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement du fichier JSON');
            }
            return response.json();
        })
        .then((data: { cameras: Array<{ brand: string, model: string, price: number, features: string[] }> }) => {
            // Affichage des appareils photo
            data.cameras.forEach((camera, index) => {
                const cameraDiv = document.createElement("div");
                cameraDiv.classList.add("appareil-case");

                const legend = document.createElement("legend");
                legend.textContent = `${camera.brand} ${camera.model}`;

                const price = document.createElement("p");
                price.textContent = `Prix : ${camera.price}`;

                const featuresList = document.createElement("ul");
                camera.features.forEach((feature: string) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = feature;
                    featuresList.appendChild(listItem);
                });

                cameraDiv.appendChild(legend);
                cameraDiv.appendChild(price);
                cameraDiv.appendChild(featuresList);

                // Ajouter un gestionnaire d'événements click pour chaque appareil
                cameraDiv.addEventListener("click", () => {
                    // Rediriger vers modif.html avec l'index de l'appareil en paramètre
                    window.location.href = `modif.html?id=${index}`;
                });

                appareilGrid.appendChild(cameraDiv);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des appareils:', error);
        });
});
