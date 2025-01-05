// Récupérer le paramètre 'id' de l'URL
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');

// Données JSON des appareils photo
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

// Vérifier si l'ID est valide
if (cameraId !== null && !isNaN(Number(cameraId)) && Number(cameraId) >= 0 && Number(cameraId) < data.cameras.length) {
    const camera = data.cameras[Number(cameraId)];

    // Afficher les détails de l'appareil
    const cameraDetailsDiv = document.getElementById("camera-details") as HTMLElement;

    const cameraTitle = document.createElement("h2");
    cameraTitle.textContent = `${camera.brand} ${camera.model}`;

    const cameraPrice = document.createElement("p");
    cameraPrice.textContent = `Prix : ${camera.price}`;

    const cameraFeatures = document.createElement("ul");
    camera.features.forEach(feature => {
        const featureItem = document.createElement("li");
        featureItem.textContent = feature;
        cameraFeatures.appendChild(featureItem);
    });

    cameraDetailsDiv.appendChild(cameraTitle);
    cameraDetailsDiv.appendChild(cameraPrice);
    cameraDetailsDiv.appendChild(cameraFeatures);

    // Pré-remplir le formulaire de modification avec les informations actuelles
    const editForm = document.getElementById("edit-form") as HTMLElement;
    const brandInput = document.getElementById("brand") as HTMLInputElement;
    const modelInput = document.getElementById("model") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const featuresInput = document.getElementById("features") as HTMLInputElement;

    brandInput.value = camera.brand;
    modelInput.value = camera.model;
    priceInput.value = camera.price;
    featuresInput.value = camera.features.join(", "); // Transforme le tableau en chaîne de caractères

    // Afficher le formulaire de modification
    editForm.style.display = "block";

    // Gestion de la soumission du formulaire pour mettre à jour l'appareil
    const updateForm = document.getElementById("update-form") as HTMLFormElement;
    updateForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Récupérer les nouvelles valeurs
        const updatedBrand = brandInput.value;
        const updatedModel = modelInput.value;
        const updatedPrice = priceInput.value;
        const updatedFeatures = featuresInput.value.split(",").map(item => item.trim());

        // Mettre à jour les données de l'appareil
        data.cameras[Number(cameraId)] = {
            brand: updatedBrand,
            model: updatedModel,
            price: updatedPrice,
            features: updatedFeatures
        };

        // Afficher un message de confirmation et rediriger
        alert("Appareil modifié avec succès !");
        window.location.href = "listes.html"; // Redirige vers la page de la liste après modification
    });
} else {
    // Si l'ID est invalide ou inexistant
    const cameraDetailsDiv = document.getElementById("camera-details") as HTMLElement;
    cameraDetailsDiv.textContent = "Appareil non trouvé.";
}
