import { calculateCost, scheduleDeliveries } from "../service.js";

describe('scheduleDeliveries Function', () => {
    const baseCost = 100;
    const vehicleCount = 2;
    const maxSpeed = 70;
    const maxWeight = 200;

    describe("Normal delivery scheduling", () => {
        let packages = [
            { id: "PKG1", weight: 50, distance: 30, offer: "OFR001" },
            { id: "PKG2", weight: 75, distance: 125, offer: "OFFR00008" },
            { id: "PKG3", weight: 175, distance: 100, offer: "OFFR003" },
            { id: "PKG3", weight: 110, distance: 60, offer: "OFR002" },
            { id: "PKG3", weight: 155, distance: 95, offer: "OFFR003" }
        ]
        const expectedResults = [
            { id: "PKG1", discount: 0, totalCost: 750, deliveryTime: 3.98 },
            { id: "PKG2", discount: 0, totalCost: 1475, deliveryTime: 1.78 },
            { id: "PKG3", discount: 0, totalCost: 2350, deliveryTime: 1.42 },
            { id: "PKG3", discount: 105, totalCost: 1395, deliveryTime: 0.85 },
            { id: "PKG3", discount: 0, totalCost: 2125, deliveryTime: 4.19 }
        ]

        test('assigns packages to vehicles and calculates delivery times correctly', async () => {
            packages.map(pkg => calculateCost(baseCost, pkg));

            const result = await scheduleDeliveries(packages, vehicleCount, maxSpeed, maxWeight);
            result.forEach((pkg, i) => {
                expect(pkg.id).toBe(expectedResults[i].id)
                expect(pkg.discount).toBe(expectedResults[i].discount)
                expect(pkg.totalCost).toBe(expectedResults[i].totalCost)
                expect(pkg.delivered).toBe(true)
                expect(Number(pkg.deliveryTime.toFixed(2))).toBeCloseTo(expectedResults[i].deliveryTime, 1)
            })
        });
    });

    describe("Error handling", () => {
        let packages = [{ id: "PKG1", weight: 50, distance: 30, offer: "OFR001" }]

        test("throws error if vehicle count is zero", () => {
            packages.map(pkg => calculateCost(baseCost, pkg))

            expect(() => scheduleDeliveries(packages, 0, maxSpeed, maxWeight))
                .toThrow("Vehicle count cannot be zero.");
        });
    });
});
