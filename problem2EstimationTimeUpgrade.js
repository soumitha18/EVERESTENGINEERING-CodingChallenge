// Input
let input = `100 5
PKG1 50 30 OFR001
PKG2 75 125 OFFR0008
PKG3 175 100 OFR003
PKG4 110 60 OFR002
PKG5 155 95 NA
2 70 200`;

const packages= input.trim().split("\n");

const [baseDeliveryCost, noOfPackages] = packages[0].split(" ").map(Number);
const [noOfVehicles, maxSpeed, maxWeight] = packages[packages.length - 1].split(" ").map(Number);

// Offers
const offers = {
    OFR001: { discount: 10, minDistance: 0, maxDistance: 199, minWeight: 70, maxWeight: 200 },
    OFR002: { discount: 7, minDistance: 50, maxDistance: 150, minWeight: 100, maxWeight: 250 },
    OFR003: { discount: 5, minDistance: 50, maxDistance: 250, minWeight: 10, maxWeight: 150 }
};

// Process packages
const packagesInfo = [];

for (let i = 1; i <= noOfPackages; i++) {
     if (!packages[i]) continue;

    const package = packages[i].split(" ")
    const pkgId = package[0]
    const pkgWeight = Number(package[1])
    const pkgDistance = Number(package[2])
    const offerCode = package[3].toUpperCase()
    if (pkgWeight < 0 || pkgDistance < 0) {
        console.log(`Invalid package details for ${pkgId}!`);
        continue;
    }

    let cost = baseDeliveryCost + ( pkgWeight * 10 ) + ( pkgDistance * 5 );

    let discount = 0;
    if (offers[offerCode]) {
        const offer = offers[offerCode]
        if(pkgDistance >= offer.minDistance && pkgDistance <= offer.maxDistance && pkgWeight >= offer.minWeight && pkgWeight <= offer.maxWeight){
            discount = Math.floor(cost * (offer.discount / 100))
        }
    }

    const totalCost = cost - discount

    packagesInfo.push({ pkgId, pkgWeight, pkgDistance, cost, discount, totalCost, deliveryTime: 0, delivered: false });
}

// Vehicles array tracks next available time
let vehicleAvailable = Array(noOfVehicles).fill(0);
let deliveredCount = 0;

// Function to find the best batch of packages for a vehicle
const findBestBatch = (availablePackages, maxWeight) => {
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
            _backtrack(i + 1, currentBatch, currentWeight + availablePackages[i].pkgWeight);
            currentBatch.pop();
        }
    };

    _backtrack(0, [], 0);
    return bestBatch;
};

// Schedule deliveries
while (deliveredCount < noOfPackages) {
    const earliestAvailableTime = Math.min(...vehicleAvailable);
    const vehicleIndex = vehicleAvailable.indexOf(earliestAvailableTime);

    const remainingPackages = packagesInfo.filter(pkg => !pkg.delivered);
    if (remainingPackages.length === 0) break;

    const batch = findBestBatch(remainingPackages, maxWeight);

    let maxDistanceInTrip = 0;
    for (const pkg of batch) {
        pkg.delivered = true;
        pkg.deliveryTime = earliestAvailableTime + pkg.pkgDistance / maxSpeed;

        if (pkg.pkgDistance > maxDistanceInTrip) maxDistanceInTrip = pkg.pkgDistance;
        deliveredCount++;
    }

    // Update vehicle availability (round trip)
    vehicleAvailable[vehicleIndex] = earliestAvailableTime + (2 * maxDistanceInTrip) / maxSpeed;
}

// Print results
packagesInfo.forEach(pkg => {
    console.log(pkg.pkgId, pkg.discount, pkg.totalCost, pkg.deliveryTime.toFixed(2));
});
