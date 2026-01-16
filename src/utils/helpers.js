import inquirer from "inquirer";
import Package from "../assets/package.js";
import { validatePositiveNumber } from "./validate.js";

export async function enterPackageDetails(packageCount) {
    console.log(`\nEnter details of package ${packageCount}`);
    const answers = await inquirer.prompt([
        { name: "id", message: "Package ID:" },
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