export default class Package {
  constructor({ id, weight, distance, offer }) {

    if (!id) throw new Error("Package ID cannot be empty");
    if (weight <= 0) throw new Error("Weight must be a number greater than 0");
    if (distance <= 0) throw new Error("Distance must be a number greater than 0");

    this.id = id;
    this.weight = weight;
    this.distance = distance;
    this.offer = offer?.toUpperCase() || "";
    this.cost = 0;
    this.discount = 0;
    this.totalCost = 0;
    this.deliveryTime = 0;
    this.delivered = false;
  }
}
