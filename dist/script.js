"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var appareilGrid = document.querySelector(".appareil-grid");
    // Charger les appareils photo dynamiquement
    if (appareilGrid) {
        fetch("cameras_data.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Vérifier que la structure des données est bien comme attendue
            if (data && Array.isArray(data.cameras)) {
                data.cameras.forEach(function (camera) {
                    var cameraDiv = document.createElement("div");
                    cameraDiv.classList.add("appareil-case");
                    var img = document.createElement("img");
                    img.src = camera.image; // Assurez-vous que `camera.image` existe et est une chaîne de caractères
                    img.alt = "".concat(camera.brand, " ").concat(camera.model);
                    var legend = document.createElement("legend");
                    legend.textContent = "".concat(camera.brand, " - ").concat(camera.model);
                    cameraDiv.appendChild(img);
                    cameraDiv.appendChild(legend);
                    appareilGrid.appendChild(cameraDiv);
                });
            }
            else {
                console.error("Structure des données invalide :", data);
            }
        })
            .catch(function (error) { return console.error("Erreur de chargement des données :", error); });
    }
});
