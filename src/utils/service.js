import offers from "../config/offers.js";

export function calculateCost(baseCost, pkg) {
    const cost = Number(baseCost) + Number(pkg.weight) * 10 + Number(pkg.distance) * 5;
    let discount = 0;

    if (offers[pkg.offer]) {
        const o = offers[pkg.offer];
        if (
            pkg.weight >= o.minWeight &&
            pkg.weight <= o.maxWeight &&
            pkg.distance >= o.minDistance &&
            pkg.distance <= o.maxDistance
        ) {
            discount = Math.floor(cost * (o.discount / 100));
        }
    }

    pkg.cost = cost;
    pkg.discount = discount;
    pkg.totalCost = cost - discount;

    return pkg;
}
