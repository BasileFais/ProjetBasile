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
});
