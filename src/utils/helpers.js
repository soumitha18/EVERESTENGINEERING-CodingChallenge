import inquirer from "inquirer";
import Package from "../assets/package.js";
import { validatePackageId, validatePositiveNumber } from "./validate.js";

export async function enterPackageDetails(packageCount) {
  console.log(`\nEnter details of package ${packageCount}`);
  const answers = await inquirer.prompt([
    { name: "id", message: "Package ID:", validate: (input) => validatePackageId(input) },
    { name: "weight", message: "Package Weight:", validate: (input) => validatePositiveNumber(input, "Weight") },
    { name: "distance", message: "Package Distance:", validate: (input) => validatePositiveNumber(input, "Distance") },
    { name: "offer", message: "Offer Code:", default: "" }
  ]);

  const pkg = new Package({
    id: answers.id,
    weight: parseFloat(answers.weight),
    distance: parseFloat(answers.distance),
    offer: answers.offer
  });

  return pkg
}

export async function displayOutput(packages, type = 'cost') {
  const tableData = packages.map(pkg => {
    const row = {
      "Package ID": pkg.id,
      "Discount": pkg.discount,
      "Total Cost": pkg.totalCost
    };

    if (type === "deliveryTime") {
      row["Delivery Time"] = `${pkg.deliveryTime.toFixed(2)}`;
    }

    return row;
  });

  console.table(tableData);
}
