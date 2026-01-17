import inquirer from "inquirer";
import { calculateCost } from "../utils/service.js";
import { validatePositiveNumber } from "../utils/validate.js";
import { displayOutput, enterPackageDetails } from "../utils/helpers.js";

export async function calculateDeliveryCost() {
  try{
    const { baseCost } = await inquirer.prompt({
      type: "input",
      name: "baseCost",
      message: "Please Enter the base delivery cost",
      validate: (input) => validatePositiveNumber(input, "Base cost")
    });

    const { count } = await inquirer.prompt({
      type: "input",
      name: "count",
      message: "Please Enter the number of packages",
      validate: (input) => validatePositiveNumber(input, "Number of packages")
    });

    const packages = [];

    for (let i = 0; i < Number(count); i++) {
      const pkg = await enterPackageDetails(i+1)
      packages.push(await calculateCost(baseCost, pkg));
    }

    displayOutput(packages)
  }catch(error){
    console.error(`\n Invalid Configurations, Please try again. \n${error.message}`)
  }
}
