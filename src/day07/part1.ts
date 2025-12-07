export async function main() {
    const grid = (await Bun.file("inputs/day07.txt").text())
        .trimEnd()
        .split("\n")
        .map((line) => line.split(""));

    let result = 0;

    for (let i = 0; i < grid[0]!.length; i++) {
        if (grid[0]![i] === "S") {
            grid[1]![i] = "|";
            break;
        }
    }

    for (let y = 1; y < grid.length; y++) {
        const row = grid[y]!;
        for (let x = 0; x < row.length; x++) {
            const cell = row[x]!;
            if (cell === "|") {
                if (grid[y + 1]) {
                    if (grid[y + 1]![x] !== "^") {
                        grid[y + 1]![x] = "|";
                    } else {
                        if (grid[y + 1]![x - 1] && grid[y + 1]![x - 1] === ".") {
                            grid[y + 1]![x - 1] = "|";
                        }
                        if (grid[y + 1]![x + 1] && grid[y + 1]![x + 1] === ".") {
                            grid[y + 1]![x + 1] = "|";
                        }
                    }
                }
            } else if (cell === "^") {
                if (grid[y - 1]![x] === "|") {
                    result++;
                }
            }
        }
    }

    console.log(result);
}
