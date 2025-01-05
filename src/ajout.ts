document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-ajout") as HTMLFormElement | null;
    const brandInput = document.getElementById("brand") as HTMLInputElement | null;
    const modelInput = document.getElementById("model") as HTMLInputElement | null;
    const priceInput = document.getElementById("price") as HTMLInputElement | null;
    const featuresInput = document.getElementById("features") as HTMLTextAreaElement | null;

    if (form && brandInput && modelInput && priceInput && featuresInput) {
        form.addEventListener("submit", (event: Event) => {
            event.preventDefault();

            const newCamera = {
                brand: brandInput.value.trim(),
                model: modelInput.value.trim(),
                price: parseFloat(priceInput.value.trim()),
                features: featuresInput.value.split(',').map(feature => feature.trim())
            };

            fetch('/addCamera', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCamera)
            })
            .then(response => response.text())
            .then(message => {
                console.log(message);
                window.location.href = "listes.html";
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'appareil:', error);
            });
        });
    }
});

export {}; // Pour éviter les erreurs dans les environnements modulaires.
