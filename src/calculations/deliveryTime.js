import inquirer from "inquirer";
import { calculateCost } from "../utils/service.js";
import Vehicle from "../assets/vehicle.js";
import { enterPackageDetails } from "../utils/helpers.js";
import { validatePositiveNumber } from "../utils/validate.js";

export async function deliveryTime() {
    const { vehicleCount, maxSpeed, maxWeight, baseCost, packageCount } = await inquirer.prompt([
        { name: "vehicleCount", message: "Number of vehicles:", validate: (input) => validatePositiveNumber(input, "Vehicle Count") },
        { name: "maxSpeed", message: "Max vehicle speed:", validate: (input) => validatePositiveNumber(input, "Max Speed") },
        { name: "maxWeight", message: "Max vehicle weight:", validate: (input) => validatePositiveNumber(input, "Max Weight") },
        { name: "baseCost", message: "BaseCost:", validate: (input) => validatePositiveNumber(input, "Base Cost") },
        { name: "packageCount", message: "Number of packages:", validate: (input) => validatePositiveNumber(input, "Number of packages") }
    ]);

    const vehicles = Array.from({ length: Number(vehicleCount) }, () => new Vehicle({ maxSpeed: Number(maxSpeed), maxWeight: Number(maxWeight) }));

    const packages = [];
    for (let i = 0; i < Number(packageCount); i++) {
        const pkg = await enterPackageDetails(i + 1)
        packages.push(calculateCost(baseCost, pkg));
    }

    console.log(vehicles, packages)
}
