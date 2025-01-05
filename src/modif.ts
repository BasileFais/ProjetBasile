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
        .then((data: any) => {
            // Affichage des appareils photo
            data.cameras.forEach((camera: any, index: number) => {
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

    // Récupérer l'ID de l'appareil depuis l'URL pour la page de modification
    const urlParams = new URLSearchParams(window.location.search);
    const appareilId = urlParams.get('id'); // Récupérer l'ID de l'appareil

    if (appareilId !== null) {
        // Charger les appareils depuis le fichier JSON
        fetch('cameras_data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de chargement du fichier JSON');
                }
                return response.json();
            })
            .then((data: any) => {
                const appareil = data.cameras[parseInt(appareilId)];

                if (appareil) {
                    // Remplir le formulaire avec les informations existantes
                    (document.getElementById('brand') as HTMLInputElement).value = appareil.brand;
                    (document.getElementById('model') as HTMLInputElement).value = appareil.model;
                    (document.getElementById('price') as HTMLInputElement).value = appareil.price;
                    (document.getElementById('features') as HTMLTextAreaElement).value = appareil.features.join(', ');  // Remplir avec les caractéristiques

                    // Gestion de la soumission du formulaire pour modifier l'appareil
                    const form = document.getElementById('modification-form') as HTMLFormElement;
                    form.addEventListener('submit', (event: Event) => {
                        event.preventDefault();  // Empêcher la soumission du formulaire

                        // Récupérer les nouvelles valeurs depuis le formulaire
                        const updatedBrand = (document.getElementById('brand') as HTMLInputElement).value;
                        const updatedModel = (document.getElementById('model') as HTMLInputElement).value;
                        const updatedPrice = (document.getElementById('price') as HTMLInputElement).value;
                        const updatedFeatures = (document.getElementById('features') as HTMLTextAreaElement).value.split(',').map(feature => feature.trim());

                        // Mettre à jour l'objet appareil avec les nouvelles valeurs
                        appareil.brand = updatedBrand;
                        appareil.model = updatedModel;
                        appareil.price = updatedPrice;
                        appareil.features = updatedFeatures;

                        // Sauvegarder les changements dans le fichier JSON ou envoyer à un serveur
                        console.log('Appareil mis à jour:', appareil);
                        alert('Les modifications ont été enregistrées !');

                        // Simuler la redirection vers la page d'accueil après sauvegarde
                        window.location.href = 'index.html';
                    });
                } else {
                    console.error('Appareil non trouvé');
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement des détails de l\'appareil:', error);
            });
    } else {
        console.error('Aucun ID d\'appareil fourni');
    }
});
