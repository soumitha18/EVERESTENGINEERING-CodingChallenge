import inquirer from "inquirer";
import Package from "../assets/package.js";
import { calculateCost } from "../utils/service.js";
import { validatePositiveNumber } from "../utils/validate.js";

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
    console.log(`\nEnter details of package ${i+1}`);
    const answers = await inquirer.prompt([
      { name: "id", message: "Package ID:" },
      {
        name: "weight",
        message: "Package Weight:",
        validate: (input) => validatePositiveNumber(input, "Weight")
      },
      {
        name: "distance",
        message: "Package Distance:",
        validate: (input) => validatePositiveNumber(input, "Distance")
      },
      { name: "offer", message: "Offer Code:", default: "" }
    ]);

    const pkg = new Package({
      id: answers.id,
      weight: parseFloat(answers.weight),
      distance: parseFloat(answers.distance),
      offer: answers.offer
    });

    packages.push(calculateCost(baseCost, pkg));
  }

  console.log(packages);
}
