document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("appareil-form") as HTMLFormElement | null;
    const brandInput = document.getElementById("brand") as HTMLInputElement | null;
    const modelInput = document.getElementById("model") as HTMLInputElement | null;
    const priceInput = document.getElementById("price") as HTMLInputElement | null;
    const featuresInput = document.getElementById("features") as HTMLInputElement | null;

    // Charger les appareils existants du localStorage
    const appareils: { brand: string, model: string, price: string, features: string[] }[] = JSON.parse(localStorage.getItem("appareils") || "[]");

    if (form) {
        form.addEventListener("submit", (event: Event) => {
            event.preventDefault(); // Empêche la soumission normale du formulaire

            // Créer un objet pour le nouvel appareil
            const newCamera = {
                brand: brandInput?.value || "",
                model: modelInput?.value || "",
                price: priceInput?.value || "",
                features: featuresInput?.value.split(',').map(feature => feature.trim()) || []
            };

            // Ajouter le nouvel appareil à la liste existante
            appareils.push(newCamera);

            // Sauvegarder la liste mise à jour dans le localStorage
            localStorage.setItem("appareils", JSON.stringify(appareils));

            // Rediriger vers la page de liste des appareils après l'ajout
            window.location.href = "listes.html";
        });
    }
});
