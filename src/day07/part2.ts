export async function main() {
    const grid = (await Bun.file("inputs/day07.txt").text())
        .trimEnd()
        .split("\n")
        .map((line) => line.split(""));

    const beamCounts: number[][] = grid.map((row) => row.map(() => 0));

    for (let i = 0; i < grid[0]!.length; i++) {
        if (grid[0]![i] === "S") {
            beamCounts[1]![i] = 1;
            break;
        }
    }

    for (let y = 1; y < grid.length; y++) {
        const row = grid[y]!;
        for (let x = 0; x < row.length; x++) {
            const count = beamCounts[y]![x]!;

            if (count === 0) continue;

            const cellBelow = grid[y + 1]?.[x];

            if (!cellBelow) {
                continue;
            }

            if (cellBelow !== "^") {
                beamCounts[y + 1]![x]! += count;
            } else {
                if (grid[y + 1]![x - 1]) {
                    beamCounts[y + 1]![x - 1]! += count;
                }
                if (grid[y + 1]![x + 1]) {
                    beamCounts[y + 1]![x + 1]! += count;
                }
            }
        }
    }

    const result = beamCounts[beamCounts.length - 1]!.reduce((a, b) => a + b, 0);
    return result;
}
