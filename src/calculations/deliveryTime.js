import inquirer from "inquirer";
import { calculateCost, scheduleDeliveries } from "../utils/service.js";
import { displayOutput, enterPackageDetails } from "../utils/helpers.js";
import { validatePositiveNumber } from "../utils/validate.js";

export async function deliveryTime() {
    try{
        const { baseCost, packageCount } = await inquirer.prompt([
            { name: "baseCost", message: "Please Enter the base delivery cost: ", validate: (input) => validatePositiveNumber(input, "Base Cost") },
            { name: "packageCount", message: "Please Enter the number of packages: ", validate: (input) => validatePositiveNumber(input, "Number of packages") }
        ]);

        const packages = [];
        for (let i = 0; i < Number(packageCount); i++) {
            const pkg = await enterPackageDetails(i + 1)
            packages.push(calculateCost(baseCost, pkg));
        }

        const { vehicleCount, maxSpeed, maxWeight, } = await inquirer.prompt([
            { name: "vehicleCount", message: "Please Enter number of vehicles:", validate: (input) => validatePositiveNumber(input, "Vehicle Count") },
            { name: "maxSpeed", message: "Please Enter max vehicle speed:", validate: (input) => validatePositiveNumber(input, "Max Speed") },
            { name: "maxWeight", message: "Please Enter max vehicle weight:", validate: (input) => validatePositiveNumber(input, "Max Weight") }
        ]);

        const deliveredPackages = scheduleDeliveries(packages, Number(vehicleCount), Number(maxSpeed), Number(maxWeight));

        displayOutput(deliveredPackages, "deliveryTime")
    }catch(error){
        console.error(`\n Invalid Configurations, Please try again. \n${error.message}`)
    }
}
