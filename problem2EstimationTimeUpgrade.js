let input = `100 5
PKG1 50 30 OFR001
PKG2 75 125 OFFR0008
PKG3 175 100 OFR003
PKG4 110 60 OFR002
PKG5 155 95 NA
2 70 200`;

const packages= input.trim().split("\n");

const [base_delivery_cost , no_of_packages]= packages[0].split(" ").map(Number)
const [no_of_vehicles, max_speed, max_weight] = packages[packages.length-1].trim().split(" ").map(Number);

const offers= {
    OFR001: {
        discount : 10,
        min_distance: 0,
        max_distance: 199,
        min_weight: 70,
        max_weight: 200
    },
    OFR002: {
        discount: 7,
        min_distance: 50,
        max_distance: 150,
        min_weight: 100,
        max_weight: 250
    },
    OFR003: {
        discount: 5,
        min_distance: 50,
        max_distance: 250,
        min_weight: 10,
        max_weight: 150
    }
}

const packages_delivery_info = []

for(let i=1; i <= no_of_packages; i++){
    if (!packages[i]) continue;

    const package = packages[i].split(" ")
    const pkg_id = package[0]
    const pkg_weight = Number(package[1])
    const distance = Number(package[2])
    const offer_code = package[3].toUpperCase()

    if(pkg_weight < 0 || distance < 0){
        console.log(`invalid package details for ${pkg_id}!`)
        continue;
    }
     
    let cost = base_delivery_cost + ( pkg_weight * 10 ) + ( distance * 5 )
    // console.log(cost, "cost:::")

    let discount = 0
    if(offers[offer_code]){
        const offer = offers[offer_code]
        if(distance >= offer.min_distance && distance <= offer.max_distance && pkg_weight >= offer.min_weight && pkg_weight <= offer.max_weight){
            discount = Math.floor(cost * (offer.discount / 100))
        }
    }
    // console.log(discount, "discount:::")

    const total_cost = cost - discount

    packages_delivery_info.push({pkg_id, pkg_weight, distance, cost, discount, total_cost, delivery_time: 0, delivered: false})
    // console.log(pkg_id, discount, total_cost)
}

let vehicles = Array(no_of_vehicles).fill(0);
let delivered_count = 0;

const findPackageBatchCombination = (available_packages, weight) => {
    let vehicleBatch = []
    let maxWeight = 0

    function vehicleTracking(index, currentBatch, currentWeight){
        if (currentWeight > weight) return;

        const isBetterCount = currentBatch.length > vehicleBatch.length;
        const isBetterWeight = currentBatch.length === vehicleBatch.length && currentWeight > maxWeight;

        if (isBetterCount || isBetterWeight) {
            vehicleBatch = [...currentBatch];
            maxWeight = currentWeight;
        }

        for (let i = index; i < available_packages.length; i++) {
            currentBatch.push(available_packages[i]);
            vehicleTracking(i + 1, currentBatch, currentWeight + available_packages[i].pkg_weight);
            currentBatch.pop(); 
        }
    }

    vehicleTracking (0, [], 0)
    return vehicleBatch
}

/**
 * Explanation & Example
 * this function help to determine the best group of packages a vehicle can carry in one trip without execeeding the maximum weight.
 * it uses recursion to explore all possible package combinations.
 * 
 * how the recursion works 
 * 1. the recursive function vehicleTracking starts from a given index and tries adding packages one by one to the current batch.
 * 2. each recursive call represents a decision to include the next package in the current trip.
 * 3. every call we have track of the current batch of packages and total weight of the batch.
 * 
 * when recursion stops - this will occure in two cases
 * 1. weight limit exceeded
 * 2. all packages processed
 * 
 * why recusion
 * 1. backtracking allows trying all valid combinations without permanently modifying the batch and stops immediately when weight exceeds limit.
 * 2. after exploring a path, the last added package is removed so other combinations can be evaluated.
 * 
 * once the recursion explored, the function returns the package batch which will fits within the weight, maximum packages and vehicle capacity 
 * 
 * Example
 * no of vehicles: 2 and max speed: 70 and max weight: 200
 * findPackageBatchCombination function will take no of packages that not delivered and maximum weight
 * 
 * step by step recursion flow
 * 1. recursion started with => no packages selected and total weight is 0 => vehicleTracking(0, [], 0)
 * 2. try PKG1 => current batch: [PKG1] and weight: 50 (<200) => best batch updated to [PKG1]
 * 3. try PKG2 with 1 => current batch: [PKG1, PKG2] and weight: 125 (<200) => best batch updataed to [PKG1, PKG2]
 * 4. try PKG3 with 1,2 => current batch: [PKG1, PKG2, PKG3] and weight: 300 (>200) => exceeded max weight - recursion stops here and backtrack => batch is still [PKG1, PLG2].
 * 5, try PKG4 with 1,2 => current batch: [PKG1, PKG2, PKG4] and weight: 235 (>200) => exceeded max weight - recursion stops and backtrack => batch is still [PKG1, PLG2].
 * 6. try PKG5 with 1,2 => current batch: [PKG1, PKG2, PKG5] and weight: 280 (>200) => exceeded max weight - recursion stops and backtrack => batch is still [PKG1, PLG2].
 * 
 * 7. try PKG3 with 1 => current batch: [PKG1, PKG3] and weight: 225 (>200) => recursion stops and backtrack
 * 
 * 8. try PKG4 with 1 => current batch: [PKG1, PKG4] and weight: 160 (<200) => same package count, higher weight -> best batch updated to [PKG1, PKG4]
 * 
 * 9. backtrack and try PKG2 and PKG4 => current batch: [PKG3, PKG4] and weight: 185 => best batch
 * 
 * 10. try PKG3 alone => weight 185 (<200) => but less packages, not preferred
 * 
 * 11. try PKG4 and PKG5 => weight become 265 => stop and backtrack
 * 
 * so the final batch selected is [PKG2, PKG4] => 
 * 1. weight 185 (maximum possible under 200 weight limit).
 * 2. number of packages: 2. 
 */

// it will loop until all packages delivered
while(delivered_count < no_of_packages){
    let available_vehicle = Math.min(...vehicles)
    let vehicle_index = vehicles.indexOf(available_vehicle)

    let remaining_packages = packages_delivery_info.filter(p => !p.delivered)
    if(remaining_packages.length === 0) break;

    // using the findPackageBatchCombination function will calculated how many packages delivered in each batch.
    let aligned_packages = findPackageBatchCombination(remaining_packages, max_weight);
    // console.log(aligned_packages, "Aligned Packages:::::")

    let max_dist_in_trip = 0
    for(let package of aligned_packages){
        package.delivered = true
        package.delivery_time = available_vehicle + (package.distance/max_speed)
        
        if(package.distance > max_dist_in_trip)
            max_dist_in_trip = package.distance

        delivered_count++
    }
    
    vehicles[vehicle_index] = available_vehicle + (2*max_dist_in_trip/max_speed)
}

packages_delivery_info.forEach(package => {
    console.log(package.pkg_id, package.discount, package.total_cost, package.delivery_time.toFixed(2))
})