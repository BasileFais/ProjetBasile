"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var appareilGrid = document.querySelector(".appareil-grid");
    var addDeviceForm = document.getElementById("add-device-form");
    var editDeviceForm = document.getElementById("edit-device-form");
    // Données des appareils photo
    var cameras = [
        {
            "brand": "Canon",
            "model": "EOS R6",
            "price": "2800€",
            "image": "../assets/images/canon_eos_r6.jpg", // Mise à jour du chemin
            "features": ["20.1 MP", "4K Video", "Stabilisation 5 axes", "ISO 102400"]
        },
        {
            "brand": "Sony",
            "model": "Alpha a7 IV",
            "price": "2700€",
            "image": "../assets/images/sony_alpha_a7_iv.jpg", // Mise à jour du chemin
            "features": ["33 MP", "4K HDR Video", "Autofocus hybride", "Écran tactile"]
        },
        {
            "brand": "Nikon",
            "model": "Z6 II",
            "price": "2300€",
            "image": "../assets/images/nikon_z6_ii.jpg", // Mise à jour du chemin
            "features": ["24.5 MP", "4K UHD", "Double slot SD", "Étanchéité"]
        },
        {
            "brand": "Fujifilm",
            "model": "X-T5",
            "price": "1900€",
            "image": "../assets/images/fujifilm_x_t5.jpg", // Mise à jour du chemin
            "features": ["40 MP", "Vidéo 6.2K", "Simulation de film", "Design rétro"]
        },
        {
            "brand": "Panasonic",
            "model": "Lumix GH6",
            "price": "2200€",
            "image": "../assets/images/panasonic_gh6.jpg", // Mise à jour du chemin
            "features": ["25 MP", "Vidéo 5.7K", "Stabilisation capteur", "Enregistrement 10-bit"]
        },
        {
            "brand": "Olympus",
            "model": "OM-D E-M1 Mark III",
            "price": "1800€",
            "image": "../assets/images/olympus_omd_em1_mark_iii.jpg", // Mise à jour du chemin
            "features": ["20.4 MP", "Pro Capture", "Stabilisation 7,5 stops", "Résistance aux intempéries"]
        },
        {
            "brand": "Leica",
            "model": "Q2",
            "price": "5000€",
            "image": "../assets/images/leica_q2.jpg", // Mise à jour du chemin
            "features": ["47.3 MP", "Objectif 28mm f/1.7", "Écran tactile", "Construction robuste"]
        },
        {
            "brand": "Pentax",
            "model": "K-3 Mark III",
            "price": "2000€",
            "image": "../assets/images/pentax_k3_mark_iii.jpg", // Mise à jour du chemin
            "features": ["25.7 MP", "Visée optique", "Résistance à la poussière", "Stabilisation SR II"]
        },
        {
            "brand": "GoPro",
            "model": "Hero 11 Black",
            "price": "550€",
            "image": "../assets/images/gopro_hero_11_black.jpg", // Mise à jour du chemin
            "features": ["Capteur 27 MP", "5.3K Video", "Étanchéité 10m", "Stabilisation HyperSmooth"]
        },
        {
            "brand": "DJI",
            "model": "Pocket 2",
            "price": "350€",
            "image": "../assets/images/dji_pocket_2.jpg", // Mise à jour du chemin
            "features": ["Capteur 1/1.7\"", "Vidéo 4K", "Stabilisation 3 axes", "Ultra compact"]
        }
    ];
    var saveCameras = function (cameras) {
        localStorage.setItem("cameras", JSON.stringify(cameras));
    };
    // Fonction pour afficher les appareils
    var displayCameras = function () {
        appareilGrid.innerHTML = ''; // Réinitialise la grille
        cameras.forEach(function (camera, index) {
            var cameraDiv = document.createElement("div");
            cameraDiv.classList.add("appareil-case");
            var img = document.createElement("img");
            img.src = camera.image;
            img.alt = "".concat(camera.brand, " ").concat(camera.model);
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
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Supprimer";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", function () {
                deleteCamera(index); // Appel de la fonction pour supprimer l'appareil
            });
            var editButton = document.createElement("button");
            editButton.textContent = "Modifier";
            editButton.classList.add("edit-button");
            editButton.addEventListener("click", function () {
                openEditForm(index); // Ouvre le formulaire de modification
            });
            cameraDiv.appendChild(img);
            cameraDiv.appendChild(legend);
            cameraDiv.appendChild(price);
            cameraDiv.appendChild(featuresList);
            cameraDiv.appendChild(deleteButton); // Ajoute le bouton supprimer
            cameraDiv.appendChild(editButton); // Ajoute le bouton modifier
            appareilGrid.appendChild(cameraDiv);
        });
    };
    // Fonction pour supprimer un appareil
    var deleteCamera = function (index) {
        cameras.splice(index, 1); // Supprimer l'appareil à l'index donné
        saveCameras(cameras); // Sauvegarder les données mises à jour
        displayCameras(); // Réafficher les appareils après suppression
    };
    // Fonction pour ouvrir le formulaire de modification
    var openEditForm = function (index) {
        window.location.href = "modif.html?index=".concat(index); // Mise à jour du chemin
    };
    // Afficher les appareils au chargement de la page
    displayCameras();
});
