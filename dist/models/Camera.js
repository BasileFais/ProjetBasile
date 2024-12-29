"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
var Camera = /** @class */ (function () {
    function Camera(id, brand, model, price, features, imageUrl) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.features = features;
        this.imageUrl = imageUrl;
    }
    return Camera;
}());
exports.Camera = Camera;
