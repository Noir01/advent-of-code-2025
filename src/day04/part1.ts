export async function main() {
    const diagram = (await Bun.file("inputs/day04.txt").text())
        .trimEnd()
        .split("\n")
        .map((line) => line.split(""));

    const m = diagram.length;
    const n = diagram[0]!.length;

    let result = 0;

    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            const cell = diagram[i]![j]!;

            if (cell === "@") {
                // upper left
                const ul = diagram[i - 1]![j - 1]!;
                // upper
                const u = diagram[i - 1]![j]!;
                // upper right
                const ur = diagram[i - 1]![j + 1]!;
                // left
                const l = diagram[i]![j - 1]!;
                // right
                const r = diagram[i]![j + 1]!;
                // lower left
                const ll = diagram[i + 1]![j - 1]!;
                // lower
                const d = diagram[i + 1]![j]!;
                // lower right
                const lr = diagram[i + 1]![j + 1]!;

                // if <4 of the 8 surrounding cells are "#", increment result
                const hashCount = [ul, u, ur, l, r, ll, d, lr].filter((c) => c === "@").length;
                if (hashCount < 4) {
                    result++;
                }
            }
        }
    }

    // top row
    for (let j = 1; j < n - 1; j++) {
        const cell = diagram[0]![j]!;

        if (cell === "@") {
            // left
            const l = diagram[0]![j - 1]!;
            // right
            const r = diagram[0]![j + 1]!;
            // lower left
            const ll = diagram[1]![j - 1]!;
            // lower
            const d = diagram[1]![j]!;
            // lower right
            const lr = diagram[1]![j + 1]!;

            // if <4 of the 8 surrounding cells are "#", increment result
            const hashCount = [l, r, ll, d, lr].filter((c) => c === "@").length;
            if (hashCount < 4) {
                result++;
            }
        }
    }

    // bottom row
    for (let j = 1; j < n - 1; j++) {
        const cell = diagram[m - 1]![j]!;

        if (cell === "@") {
            // left
            const l = diagram[m - 1]![j - 1]!;
            // right
            const r = diagram[m - 1]![j + 1]!;
            // upper left
            const ul = diagram[m - 2]![j - 1]!;
            // upper
            const u = diagram[m - 2]![j]!;
            // upper right
            const ur = diagram[m - 2]![j + 1]!;

            // if <4 of the 8 surrounding cells are "#", increment result
            const hashCount = [l, r, ul, u, ur].filter((c) => c === "@").length;
            if (hashCount < 4) {
                result++;
            }
        }
    }

    // left column
    for (let i = 1; i < m - 1; i++) {
        const cell = diagram[i]![0]!;

        if (cell === "@") {
            // upper
            const u = diagram[i - 1]![0]!;
            // upper right
            const ur = diagram[i - 1]![1]!;
            // right
            const r = diagram[i]![1]!;
            // lower
            const d = diagram[i + 1]![0]!;
            // lower right
            const lr = diagram[i + 1]![1]!;

            // if <4 of the 8 surrounding cells are "#", increment result
            const hashCount = [u, ur, r, d, lr].filter((c) => c === "@").length;
            if (hashCount < 4) {
                result++;
            }
        }
    }

    // right column
    for (let i = 1; i < m - 1; i++) {
        const cell = diagram[i]![n - 1]!;

        if (cell === "@") {
            // upper
            const u = diagram[i - 1]![n - 1]!;
            // upper left
            const ul = diagram[i - 1]![n - 2]!;
            // left
            const l = diagram[i]![n - 2]!;
            // lower
            const d = diagram[i + 1]![n - 1]!;
            // lower left
            const ll = diagram[i + 1]![n - 2]!;

            // if <4 of the 8 surrounding cells are "#", increment result
            const hashCount = [u, ul, l, d, ll].filter((c) => c === "@").length;
            if (hashCount < 4) {
                result++;
            }
        }
    }

    // corners
    if (diagram[0]![0] === "@") result++;
    if (diagram[0]![n - 1] === "@") result++;
    if (diagram[m - 1]![0] === "@") result++;
    if (diagram[m - 1]![n - 1] === "@") result++;

    return result;
}
