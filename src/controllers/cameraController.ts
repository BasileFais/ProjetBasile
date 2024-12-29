import { Camera } from "../models/Camera";
import { CameraView } from "../views/cameraViews";
import camerasData from "../data/cameras.json";

export class CameraController {
  private cameras: Camera[] = [];
  private view: CameraView;

  constructor() {
    this.view = new CameraView();
    this.loadCameras();
  }

  loadCameras() {
    try {
      this.cameras = camerasData.map((c: any) => new Camera(c.id, c.brand, c.model, c.price, c.features, c.imageUrl));
      this.view.renderCameraList(this.cameras);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  }
}