import { calculateCost } from "../service.js";

describe('calculateCost', () => {
  test('calculates total cost without offer', () => {
    const pkg = {
      weight: 10,
      distance: 5,
      offer: ''
    };

    const result = calculateCost(100, pkg);

    expect(result.totalCost).toBe(100 + 10 * 10 + 5 * 5);
    expect(result.discount).toBe(0);
  });

  test('applies discount when offer is valid', () => {
    const pkg = {
      weight: 100,
      distance: 100,
      offer: 'OFR002'
    };

    const result = calculateCost(100, pkg);

    expect(result.discount).toBeGreaterThan(0);
    expect(result.totalCost).toBeLessThan(result.cost);
  });
});
