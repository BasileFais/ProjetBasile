document.addEventListener("DOMContentLoaded", () => {
    const appareilGrid = document.querySelector(".appareil-grid") as HTMLElement;
    const adminButton = document.getElementById("admin-button") as HTMLElement;
    const ajoutButton = document.getElementById("ajout-button") as HTMLElement;
    const connectedMessage = document.getElementById("connected-message") as HTMLElement | null;  // Ajout du type `null` pour permettre la vérification

    const logoutButton = document.createElement("button");

    // Créer un bouton de déconnexion
    logoutButton.textContent = "Se déconnecter";
    logoutButton.style.display = "none"; // Par défaut, il est caché
    document.body.appendChild(logoutButton);

    // Vérification de la connexion dans le localStorage
    if (localStorage.getItem("isConnected") === "true") {
        // Si l'utilisateur est connecté, afficher le message et masquer le bouton Admin
        if (connectedMessage) {
            connectedMessage.style.display = "block"; // Affiche le message de connexion réussie
        }
        if (adminButton) adminButton.style.display = "none";  // Masquer le bouton Admin
        if (ajoutButton) ajoutButton.style.display = "block"; // Affiche le bouton Ajouter un appareil
        logoutButton.style.display = "block"; // Affiche le bouton de déconnexion

        // Afficher le formulaire d'ajout d'appareil juste sous le header
        const appareilFormContainer = document.querySelector('.appareil-form-container') as HTMLElement;
        if (appareilFormContainer) {
            appareilFormContainer.style.display = "block";
        }
    } else {
        // Si l'utilisateur n'est pas connecté, afficher le bouton Admin et masquer le bouton de déconnexion
        if (adminButton) adminButton.style.display = "block"; // Affiche le bouton Admin
        if (ajoutButton) ajoutButton.style.display = "none"; // Cache le bouton Ajouter un appareil
        logoutButton.style.display = "none"; // Cache le bouton de déconnexion

        // Masquer le formulaire d'ajout d'appareil
        const appareilFormContainer = document.querySelector('.appareil-form-container') as HTMLElement;
        if (appareilFormContainer) {
            appareilFormContainer.style.display = "none";
        }
    }

    // Gestion de l'événement sur le bouton Admin
    adminButton?.addEventListener("click", () => {
        window.location.href = "adminconnexion.html"; // Redirige vers la page de connexion
    });

    // Fonction de déconnexion
    logoutButton.addEventListener("click", () => {
        // Supprime la clé isConnected du localStorage pour déconnecter l'utilisateur
        localStorage.removeItem("isConnected");
        // Masque le message de connexion et le bouton de déconnexion
        if (connectedMessage) connectedMessage.style.display = "none";
        logoutButton.style.display = "none";
        // Réaffiche le bouton Admin
        if (adminButton) adminButton.style.display = "block";
        if (ajoutButton) ajoutButton.style.display = "none"; // Cache le bouton Ajouter un appareil
        alert("Vous êtes déconnecté.");
    });

    // Données JSON intégrées directement dans le script
    const data = {
        cameras: [
            {
                brand: "Canon",
                model: "EOS R6",
                price: "2800€",
                features: ["20.1 MP", "4K Video", "Stabilisation 5 axes", "ISO 102400"]
            },
            {
                brand: "Sony",
                model: "Alpha a7 IV",
                price: "2700€",
                features: ["33 MP", "4K HDR Video", "Autofocus hybride", "Écran tactile"]
            },
            {
                brand: "Nikon",
                model: "Z6 II",
                price: "2200€",
                features: ["24.5 MP", "4K UHD Video", "Autofocus à détection de phase", "ISO 51200"]
            },
            {
                brand: "Fujifilm",
                model: "X-T4",
                price: "1800€",
                features: ["26.1 MP", "6.5 stops de stabilisation", "4K Video", "Écran articulé"]
            },
            {
                brand: "Panasonic",
                model: "Lumix GH5 II",
                price: "1800€",
                features: ["20.3 MP", "5K Video", "Autofocus DFD", "Stabilisation 5 axes"]
            },
            {
                brand: "Olympus",
                model: "OM-D E-M1 Mark III",
                price: "1600€",
                features: ["20.4 MP", "4K Video", "Stabilisation 5 axes", "ISO 25600"]
            },
            {
                brand: "Leica",
                model: "SL2",
                price: "5300€",
                features: ["47.3 MP", "6K Video", "Écran tactile", "Autofocus rapide"]
            },
            {
                brand: "GoPro",
                model: "Hero 10 Black",
                price: "500€",
                features: ["23 MP", "5.3K Video", "Stabilisation HyperSmooth", "Résistance à l'eau jusqu'à 10m"]
            }
        ]
    };

    // Affichage des appareils photo sans images
    data.cameras.forEach((camera, index) => {
        const cameraDiv = document.createElement("div");
        cameraDiv.classList.add("appareil-case");

        // Ajout d'un gestionnaire de clic
        cameraDiv.addEventListener("click", () => {
            // Redirige vers modif.html avec l'index comme paramètre
            window.location.href = `modif.html?id=${index}`;
        });

        const legend = document.createElement("legend");
        legend.textContent = `${camera.brand} ${camera.model}`;  // Utilisez les backticks pour l'interpolation de chaîne

        const price = document.createElement("p");
        price.textContent = `Prix : ${camera.price}`;  // Utilisez les backticks pour l'interpolation de chaîne

        const featuresList = document.createElement("ul");
        camera.features.forEach((feature) => {
            const listItem = document.createElement("li");
            listItem.textContent = feature;
            featuresList.appendChild(listItem);
        });

        cameraDiv.appendChild(legend);
        cameraDiv.appendChild(price);
        cameraDiv.appendChild(featuresList);

        appareilGrid.appendChild(cameraDiv);
    });
});
