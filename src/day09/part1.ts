export async function main() {
    const redTilePos = (await Bun.file("inputs/day09.txt").text())
        .trimEnd()
        .split("\n")
        .map((pos) => pos.split(",").map(Number) as [number, number]);

    const areas = [];

    for (let i = 0; i < redTilePos.length; i++) {
        for (let j = i + 1; j < redTilePos.length; j++) {
            const [x1, y1] = redTilePos[i]!;
            const [x2, y2] = redTilePos[j]!;
            const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
            areas.push(area);
        }
    }

    let maxArea = 0;
    for (const area of areas) {
        if (area > maxArea) {
            maxArea = area;
        }
    }

    console.log(maxArea);
}
