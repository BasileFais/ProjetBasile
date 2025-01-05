"use strict";
document.addEventListener("DOMContentLoaded", function () {
    // Récupérer l'ID de l'appareil depuis l'URL
    var urlParams = new URLSearchParams(window.location.search);
    var appareilId = urlParams.get('id');
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
                var form = document.getElementById('modification-form');
                document.getElementById('brand').value = appareil.brand;
                document.getElementById('model').value = appareil.model;
                document.getElementById('price').value = appareil.price;
                document.getElementById('features').value = appareil.features.join(', ');
                // Gestion de la soumission du formulaire pour modifier l'appareil
                form.addEventListener('submit', function (event) {
                    event.preventDefault(); // Empêcher la soumission du formulaire
                    // Récupérer les nouvelles valeurs depuis le formulaire
                    var updatedBrand = document.getElementById('brand').value;
                    var updatedModel = document.getElementById('model').value;
                    var updatedPrice = document.getElementById('price').value;
                    var updatedFeatures = document.getElementById('features').value.split(',');
                    // Mettre à jour l'objet appareil avec les nouvelles valeurs
                    appareil.brand = updatedBrand;
                    appareil.model = updatedModel;
                    appareil.price = updatedPrice;
                    appareil.features = updatedFeatures;
                    // Sauvegarder les changements (ici vous pouvez simuler un enregistrement localement ou faire une requête à un serveur)
                    // Pour cet exemple, je vais juste afficher dans la console.
                    console.log('Appareil mis à jour:', appareil);
                    // Simuler la sauvegarde (vous pouvez ici envoyer la requête PUT pour une API, etc.)
                    alert('Les modifications ont été enregistrées !');
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
