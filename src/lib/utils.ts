import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCombinations<T>(matrix: T[][]): T[][] {
  return matrix.reduce<T[][]>(
    (combinations, row) => {
      return combinations.flatMap((combination) => {
        return row.map((item) => [...combination, item])
      })
    },
    [[]]
  )
}

// export function generateCombinations2<T extends unknown[][]>(matrix: T) {
//   const result = []

//   function backtrack(row, combination) {
//     if (row === matrix.length) {
//       result.push(combination)
//       return
//     }

//     const currentRow = matrix[row]
//     for (let i = 0; i < currentRow.length; i++) {
//       const newCombination = combination.concat(currentRow[i])
//       backtrack(row + 1, newCombination)
//     }
//   }

//   backtrack(0, [])

//   return result
// }
