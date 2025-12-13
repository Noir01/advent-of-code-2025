export async function main() {
    const rawInput = (await Bun.file("inputs/day05.txt").text()).trimEnd().split("\n");

    let split = 0;
    for (let i = 0; i < rawInput.length; i++) {
        if (rawInput[i] === "") {
            split = i;
            break;
        }
    }
    const rawIngredientRanges = rawInput
        .slice(0, split)
        .map((range) => range.split("-").map(Number))
        .sort((a, b) => a[0]! - b[0]!);

    const ingredientRanges: number[][] = [];

    for (const [start, end] of rawIngredientRanges) {
        if (ingredientRanges.length === 0 || start! > ingredientRanges!.at(-1)![1]! + 1) {
            ingredientRanges.push([start!, end!]);
        } else {
            ingredientRanges.at(-1)![1] = Math.max(ingredientRanges.at(-1)![1]!, end!);
        }
    }

    let freshIngredients = 0;

    for (const ingredientRange of ingredientRanges) {
        freshIngredients += ingredientRange[1]! - ingredientRange[0]! + 1;
    }
    return freshIngredients;
}
