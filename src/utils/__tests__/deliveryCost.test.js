import { calculateCost } from "../service.js";

describe('calculateCost Function', () => {
  const baseCost = 100;

  describe("Packages without any offer", () => {
    const packages = [
      { id: "PKG1", weight: 5, distance: 5, offer: "" },
      { id: "PKG2", weight: 15, distance: 5 }
    ];

    const expectedResults = [
      { id: "PKG1", discount: 0, totalCost: 175 },
      { id: "PKG2", discount: 0, totalCost: 275 },
    ]

    test('calculates correct totalCost when no offer is applied', () => {
      packages.forEach((pkg, i) => {
        const result = calculateCost(baseCost, pkg)

        expect(result.id).toBe(expectedResults[i].id)
        expect(result.discount).toBe(expectedResults[i].discount)
        expect(result.totalCost).toBe(expectedResults[i].totalCost)
        expect(result.totalCost).toBe(baseCost + pkg.weight * 10 + pkg.distance * 5)
      })

    });
  });

  describe("Packages with valid offers", () => {
    const packages = [
      { id: "PKG1", weight: 5, distance: 5, offer: "OFR001" },
      { id: "PKG2", weight: 15, distance: 5, offer: "OFR002" },
      { id: "PKG3", weight: 10, distance: 100, offer: "OFR003" }
    ];

    const expectedResults = [
      { id: "PKG1", discount: 0, totalCost: 175 },
      { id: "PKG2", discount: 0, totalCost: 275 },
      { id: "PKG3", discount: 35, totalCost: 665 }
    ]

    test("applies discount correctly with valid offers", () => {
      packages.forEach((pkg, i) => {
        const result = calculateCost(baseCost, pkg)

        expect(result.id).toBe(expectedResults[i].id)
        expect(result.discount).toBe(expectedResults[i].discount)
        expect(result.totalCost).toBe(expectedResults[i].totalCost)
      })
    });
  })

  describe("Packages with invalid or mismatched offers", () => {
    const packages = [
      { id: "PKG1", weight: 5, distance: 5, offer: "N/A" },
      { id: "PKG2", weight: 15, distance: 5, offer: "OFFFFFR0002" },
      { id: "PKG3", weight: 10, distance: 100, offer: "OFFR0003" }
    ];

    const expectedResults = [
      { id: "PKG1", discount: 0, totalCost: 175 },
      { id: "PKG2", discount: 0, totalCost: 275 },
      { id: "PKG3", discount: 0, totalCost: 700 }
    ]

    test("does not apply discount if the offer code is invalid", () => {
      packages.forEach((pkg, i) => {
        const result = calculateCost(baseCost, pkg)

        expect(result.id).toBe(expectedResults[i].id)
        expect(result.discount).toBe(expectedResults[i].discount)
        expect(result.totalCost).toBe(expectedResults[i].totalCost)
      })
    });
  })
});
