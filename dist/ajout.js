"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("form-ajout");
    var brandInput = document.getElementById("brand");
    var modelInput = document.getElementById("model");
    var priceInput = document.getElementById("price");
    var featuresInput = document.getElementById("features");
    if (form && brandInput && modelInput && priceInput && featuresInput) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var newCamera = {
                brand: brandInput.value.trim(),
                model: modelInput.value.trim(),
                price: parseFloat(priceInput.value.trim()),
                features: featuresInput.value.split(',').map(function (feature) { return feature.trim(); })
            };
            fetch('/addCamera', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCamera)
            })
                .then(function (response) { return response.text(); })
                .then(function (message) {
                console.log(message);
                window.location.href = "listes.html";
            })
                .catch(function (error) {
                console.error('Erreur lors de l\'ajout de l\'appareil:', error);
            });
        });
    }
});
