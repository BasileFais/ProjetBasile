"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var ajoutButton = document.getElementById("ajout-button");
    var appareilGrid = document.querySelector("#appareil-grid");
    // Vérification de la connexion et des droits d'admin
    var isConnected = localStorage.getItem("isConnected") === "true";
    var isAdmin = localStorage.getItem("isAdmin") === "true";
    // Masquer le bouton Ajouter un appareil si l'utilisateur n'est pas connecté en tant qu'admin
    if (isConnected && isAdmin) {
        // Si l'utilisateur est connecté et admin, afficher le bouton Ajouter un appareil
        ajoutButton.style.display = "block"; // Affiche le bouton
    }
    else {
        // Si l'utilisateur n'est pas admin ou pas connecté, masquer le bouton Ajouter un appareil
        ajoutButton.style.display = "none"; // Cache le bouton
    }
    // Fonction pour rediriger vers ajout.html
    ajoutButton.addEventListener("click", function () {
        window.location.href = "ajout.html"; // Redirige vers la page ajout.html
    });
    // Chargement des appareils depuis le fichier JSON
    fetch('cameras_data.json') // Assurez-vous que le chemin est correct
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier JSON');
        }
        return response.json();
    })
        .then(function (data) {
        // Affichage des appareils photo
        data.cameras.forEach(function (camera, index) {
            var cameraDiv = document.createElement("div");
            cameraDiv.classList.add("appareil-case");
            var legend = document.createElement("legend");
            legend.textContent = "".concat(camera.brand, " ").concat(camera.model);
            var price = document.createElement("p");
            price.textContent = "Prix : ".concat(camera.price);
            var featuresList = document.createElement("ul");
            camera.features.forEach(function (feature) {
                var listItem = document.createElement("li");
                listItem.textContent = feature;
                featuresList.appendChild(listItem);
            });
            cameraDiv.appendChild(legend);
            cameraDiv.appendChild(price);
            cameraDiv.appendChild(featuresList);
            // Ajouter un gestionnaire d'événements click pour chaque appareil
            cameraDiv.addEventListener("click", function () {
                // Rediriger vers modif.html avec l'index de l'appareil en paramètre
                window.location.href = "modif.html?id=".concat(index);
            });
            appareilGrid.appendChild(cameraDiv);
        });
    })
        .catch(function (error) {
        console.error('Erreur lors du chargement des appareils:', error);
    });
    // Récupérer l'ID de l'appareil depuis l'URL pour la page de modification
    var urlParams = new URLSearchParams(window.location.search);
    var appareilId = urlParams.get('id'); // Récupérer l'ID de l'appareil
    if (appareilId !== null) {
        // Charger les appareils depuis le fichier JSON
        fetch('cameras_data.json')
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Erreur de chargement du fichier JSON');
            }
            return response.json();
        })
            .then(function (data) {
            var appareil = data.cameras[parseInt(appareilId)];
            if (appareil) {
                // Remplir le formulaire avec les informations existantes
                document.getElementById('brand').value = appareil.brand;
                document.getElementById('model').value = appareil.model;
                document.getElementById('price').value = appareil.price;
                document.getElementById('features').value = appareil.features.join(', '); // Remplir avec les caractéristiques
                // Gestion de la soumission du formulaire pour modifier l'appareil
                var form = document.getElementById('modification-form');
                form.addEventListener('submit', function (event) {
                    event.preventDefault(); // Empêcher la soumission du formulaire
                    // Récupérer les nouvelles valeurs depuis le formulaire
                    var updatedBrand = document.getElementById('brand').value;
                    var updatedModel = document.getElementById('model').value;
                    var updatedPrice = document.getElementById('price').value;
                    var updatedFeatures = document.getElementById('features').value.split(',').map(function (feature) { return feature.trim(); });
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
            }
            else {
                console.error('Appareil non trouvé');
            }
        })
            .catch(function (error) {
            console.error('Erreur lors du chargement des détails de l\'appareil:', error);
        });
    }
    else {
        console.error('Aucun ID d\'appareil fourni');
    }
});
