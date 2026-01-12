// let input= `100 2
// PKG2 15 5 OFR002
// PKG3 10 100 OFR003`

let input = `100 1
PKG1 50 -100 OFR003`

const packages= input.trim().split("\n");

const [base_delivery_cost , no_of_packages]= packages[0].split(" ").map(Number)

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

for(let i=1; i <= no_of_packages; i++){
    if (!packages[i]) continue;

    const package = packages[i].split(" ")
    const pkg_id = package[0]
    const pkg_weight = Number(package[1])
    const distance = Number(package[2])
    const offer_code = package[3].toUpperCase()

    if(pkg_weight < 0 || distance < 0){
        console.log("invalid input!")
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
    console.log(pkg_id, discount, total_cost)
}

/** edge cases handled..... 
 * 1. invalid offer codes (no discount added)
 * 2. sensitivity in Offer Code
 * 3. offer boundaries (weight and distance)
 * 4. prevents decimal output - discount value
 * 5. mismatch b/w no_of_packages and list of packages
 * 6. invalid inputs (negative values)
*/

