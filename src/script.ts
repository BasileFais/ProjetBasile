interface Camera {
    brand: string;
    model: string;
    price: string;
    features: string[];
    image: string; // Ajoutez une propriété 'image' pour l'URL de l'image
}

document.addEventListener("DOMContentLoaded", () => {
    const appareilGrid = document.querySelector(".appareil-grid") as HTMLElement;

    // Charger les appareils photo dynamiquement
    if (appareilGrid) {
        fetch("cameras_data.json")
            .then((response) => response.json())
            .then((data) => {
                // Vérifier que la structure des données est bien comme attendue
                if (data && Array.isArray(data.cameras)) {
                    data.cameras.forEach((camera: Camera) => { // Utilisation de l'interface Camera
                        const cameraDiv = document.createElement("div");
                        cameraDiv.classList.add("appareil-case");

                        const img = document.createElement("img");
                        img.src = camera.image; // Assurez-vous que `camera.image` existe et est une chaîne de caractères
                        img.alt = `${camera.brand} ${camera.model}`;

                        const legend = document.createElement("legend");
                        legend.textContent = `${camera.brand} - ${camera.model}`;

                        cameraDiv.appendChild(img);
                        cameraDiv.appendChild(legend);
                        appareilGrid.appendChild(cameraDiv);
                    });
                } else {
                    console.error("Structure des données invalide :", data);
                }
            })
            .catch((error) => console.error("Erreur de chargement des données :", error));
    }
});
