export default class Vehicle {
  constructor({ maxSpeed, maxWeight }) {
    this.maxSpeed = maxSpeed;
    this.maxWeight = maxWeight;
    this.availableAt = 0;
  }
}
