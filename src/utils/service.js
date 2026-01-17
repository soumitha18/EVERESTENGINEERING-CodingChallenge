import { offers, costPerKg, costPerKm, returnTriptMultiper } from "../config/offers.js";

export function calculateCost(baseCost, pkg) {
    const cost = Number(baseCost) + Number(pkg.weight) * costPerKg + Number(pkg.distance) * costPerKm;
    let discount = 0;

    if (pkg.offer && offers[pkg.offer]) {
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

export function scheduleDeliveries(packages, vehicleCount, maxSpeed, maxWeight) {

    if (vehicleCount <= 0) throw new Error("Vehicle count cannot be zero.");

    let vehicleAvailable = Array(vehicleCount).fill(0);
    let deliveredCount = 0;

    while (deliveredCount < packages.length) {
        const earliestAvailableTime = Math.min(...vehicleAvailable);
        const vehicleIndex = vehicleAvailable.indexOf(earliestAvailableTime);

        const remainingPackages = packages.filter(pkg => !pkg.delivered);
        if (remainingPackages.length === 0) break;

        const batch = findBestBatch(remainingPackages, maxWeight);

        if (batch.length === 0) {
            throw new Error("Package assignment failed: weight exceeds the maximum limit.");
        }

        let maxDistanceInTrip = 0;
        for (const pkg of batch) {
            pkg.delivered = true;
            pkg.deliveryTime = earliestAvailableTime + pkg.distance / maxSpeed;
            if (pkg.distance > maxDistanceInTrip) maxDistanceInTrip = pkg.distance;
            deliveredCount++;
        }

        vehicleAvailable[vehicleIndex] = earliestAvailableTime + (returnTriptMultiper * maxDistanceInTrip) / maxSpeed;
    }
    return packages;
}

// Backtracking used due to small input size
function findBestBatch(availablePackages, maxWeight) {
    let bestBatch = [];
    let maxBatchWeight = 0;

    const _backtrack = (index, currentBatch, currentWeight) => {
        if (currentWeight > maxWeight) return;

        const isBetterCount = currentBatch.length > bestBatch.length;
        const isBetterWeight = currentBatch.length === bestBatch.length && currentWeight > maxBatchWeight;

        if (isBetterCount || isBetterWeight) {
            bestBatch = [...currentBatch];
            maxBatchWeight = currentWeight;
        }

        for (let i = index; i < availablePackages.length; i++) {
            currentBatch.push(availablePackages[i]);
            _backtrack(i + 1, currentBatch, currentWeight + availablePackages[i].weight);
            currentBatch.pop();
        }
    };

    _backtrack(0, [], 0);
    return bestBatch;
}
