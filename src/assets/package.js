export default class Package {
  constructor({ id, weight, distance, offer }) {
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
