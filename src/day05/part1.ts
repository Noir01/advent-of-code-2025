function findClosestLeft(arr: number[], target: number): number {
    let left = 0,
        right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid]! <= target) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

export async function main() {
    const rawInput = (await Bun.file("inputs/day05.txt").text()).trimEnd().split("\n");

    let split = 0;
    for (let i = 0; i < rawInput.length; i++) {
        if (rawInput[i] === "") {
            split = i;
            break;
        }
    }

    const [rawIngredientRanges, ingredients] = [
        rawInput
            .slice(0, split)
            .map((range) => range.split("-").map(Number))
            .sort((a, b) => a[0]! - b[0]!),
        rawInput.slice(split + 1).map(Number),
    ];

    const ingredientRanges: number[][] = [];

    for (const [start, end] of rawIngredientRanges) {
        if (ingredientRanges.length === 0 || start! > ingredientRanges!.at(-1)![1]! + 1) {
            ingredientRanges.push([start!, end!]);
        } else {
            ingredientRanges.at(-1)![1] = Math.max(ingredientRanges.at(-1)![1]!, end!);
        }
    }

    let freshIngredients = 0;

    for (const ingredient of ingredients) {
        const idx = findClosestLeft(
            ingredientRanges.map((range) => range[0]!),
            ingredient,
        );

        if (idx === -1 || ingredientRanges[idx]![1]! < ingredient) {
            continue;
        }

        freshIngredients++;
    }

    return freshIngredients;
}
