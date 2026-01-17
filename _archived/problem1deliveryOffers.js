let input= `100 3
PKG3 10 100 OFR003
PKG1 50 -100 OFR003
PKG2 15 5 OFR002`

// let input = `100 1
// PKG1 50 100 OFR003`

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
    console.log(pkgId, discount, totalCost)
}

/** edge cases handled..... 
 * 1. invalid offer codes (no discount added)
 * 2. sensitivity in Offer Code
 * 3. offer boundaries (weight and distance)
 * 4. prevents decimal output - discount value
 * 5. mismatch b/w no_of_packages and list of packages
 * 6. invalid inputs (negative values)
*/

