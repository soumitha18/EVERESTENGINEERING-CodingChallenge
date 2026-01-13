## findBestBatch Explanation
* this function help to determine the best group of packages a vehicle can carry in one trip without execeeding the maximum weight.
* it uses recursion to explore all possible package combinations.

### How the recursion works
* The recursive function `_backtrack` starts from a given index and tries adding packages one by one to the current batch.
* Each recursive call represents a decision to include the next package in the current trip.
* Every call we have track of the current batch of packages and total weight of the batch.
  
### when recursion stops - this will occure in two cases
* weight limit exceeded
* all packages processed
  
### why recusion
* Backtracking allows trying all valid combinations without permanently modifying the batch and stops immediately when weight exceeds limit.
* After exploring a path, the last added package is removed so other combinations can be evaluated.

* once the recursion explored, the function returns the package batch which will fits within the weight, maximum packages and vehicle capacity 
  
## Example
* no of vehicles: `2` and max speed: `70` and max weight: `200`
* `findBestBatch` function will take no of packages that not delivered and maximum weight

### step by step recursion flow
  1. recursion started with => no packages selected and total weight is 0 => `_backtrack(0, [], 0)`
  2. try `PKG1` => current batch: `[PKG1]` and weight: `50 (<200)` => best batch updated to `[PKG1]`
  3. try `PKG2` with 1 => current batch: `[PKG1, PKG2]` and weight: `125 (<200)` => best batch updataed to `[PKG1, PKG2]`
  4. try `PKG3` with 1,2 => current batch: `[PKG1, PKG2, PKG3]` and weight: `300 (>200)` => exceeded max weight - recursion stops here and backtrack => batch is still `[PKG1, PLG2]`
  5, try `PKG4` with 1,2 => current batch: `[PKG1, PKG2, PKG4]` and weight: `235 (>200)` => exceeded max weight - recursion stops and backtrack => batch is still `[PKG1, PLG2]`
  6. try `PKG5` with 1,2 => current batch: `[PKG1, PKG2, PKG5]` and weight: `280 (>200)` => exceeded max weight - recursion stops and backtrack => batch is still `[PKG1, PLG2]`
  
  7. try `PKG3` with 1 => current batch: `[PKG1, PKG3]` and weight: `225 (>200)` => recursion stops and backtrack
  
  8. try `PKG4` with 1 => current batch: `[PKG1, PKG4]` and weight: `160 (<200)` => same package count, higher weight -> best batch updated to `[PKG1, PKG4]`
  
  9. backtrack and try `PKG2` and `PKG4` => current batch: `[PKG3, PKG4]` and weight: `185` => best batch
  
  10. try `PKG3` alone => weight `185 (<200)` => but less packages, not preferred
  
  11. try `PKG4` and `PKG5` => weight become `265` => stop and backtrack
  
  ### so the final batch selected is [PKG2, PKG4] => 
  1. weight 185 (maximum possible under 200 weight limit).
  2. number of packages: 2. 
