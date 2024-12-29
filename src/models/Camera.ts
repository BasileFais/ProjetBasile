export class Camera {
    constructor(
      public id: number,
      public brand: string,
      public model: string,
      public price: number,
      public features: string[],
      public imageUrl: string
    ) {}
  }