import inquirer from "inquirer";
import { calculateDeliveryCost } from "./calculations/deliveryCost.js";

async function main() {
  console.log(`
    
                  K I K I   E X P R E S S
                  
`);
     
  while (true) {
    const { choice } = await inquirer.prompt({
      type: "list",
      name: "choice",
      message: "Select an option",
      choices: ["Calculate delivery cost", "Calculate delivery time", "Exit"]
    });

    if (choice === "Exit") break;

    if (choice === "Calculate delivery cost") {
      await calculateDeliveryCost()
    }

    if (choice === "Calculate delivery time") {
      console.log("Delivery time calculation coming next......");
    }
  }
}

main();
