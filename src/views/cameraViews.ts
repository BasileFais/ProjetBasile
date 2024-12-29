import { Camera } from "../models/Camera";

export class CameraView {
  renderCameraList(cameras: Camera[]) {
    const container = document.getElementById("camera-list");
    if (container) {
      container.innerHTML = "";
      cameras.forEach(camera => {
        const cameraCard = `
          <div class="camera-card">
            <img src="assets/${camera.imageUrl}" alt="${camera.model}" />
            <h3>${camera.brand} - ${camera.model}</h3>
            <p>Prix : $${camera.price}</p>
            <ul>${camera.features.map((f: string) => `<li>${f}</li>`).join("")}</ul>
          </div>
        `;
        container.innerHTML += cameraCard;
      });
    }
  }
}