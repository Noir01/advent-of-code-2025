export async function main() {
    const rawInput = (await Bun.file("inputs/day12.txt").text()).trimEnd().split("\n\n");

    const shapes: string[][][] = [];
    for (const potentialShape of rawInput) {
        if (potentialShape.includes("x")) {
            break;
        }

        const shape = potentialShape
            .split("\n")
            .slice(1)
            .map((line) => line.split(""));
        shapes.push(shape);
    }

    const regions: Array<[[number, number], number[]]> = rawInput
        .slice(-1)[0]!
        .split("\n")
        .map((line) => {
            const [dims, counts] = line.split(": ");
            // "4x4" into [4, 4]
            const [w, h] = dims!.split("x").map(Number);

            // "0 0 0 2 0" into [0, 0, 0, 2, 0]
            const targetCounts = counts!.split(" ").map(Number);

            return [[w!, h!], targetCounts];
        });

    const areas = shapes.map((shape) => shape.flat().filter((cell) => cell === "#").length);
    const result = regions.filter(([[x, y], presents]) => {
        const area = x * y;
        const _impossible = presents.reduce((acc, val, i) => acc + val * areas[i]!, 0) > area;
        const trivial =
            presents.reduce((acc, curr) => acc + curr, 0) <= Math.floor(x / 3) * Math.floor(y / 3);

        return trivial;
    }).length;

    console.log(result);
}
