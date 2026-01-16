import inquirer from "inquirer";
import { calculateCost } from "../utils/service.js";
import { validatePositiveNumber } from "../utils/validate.js";
import { enterPackageDetails } from "../utils/helpers.js";

export async function calculateDeliveryCost() {

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
    const pkg = enterPackageDetails(i+1)
    packages.push(calculateCost(baseCost, pkg));
  }

  console.log(packages);
}
