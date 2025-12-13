export async function main() {
    const redTilePos = (await Bun.file("inputs/day09.txt").text())
        .trimEnd()
        .split("\n")
        .map((pos) => pos.split(",").map(Number) as [number, number]);

    const edges: [[number, number], [number, number]][] = [];
    for (let i = 0; i < redTilePos.length; i++) {
        const current = redTilePos[i]!;
        const next = redTilePos[(i + 1) % redTilePos.length]!;
        edges.push([current, next]);
    }

    let maxArea = 0;

    for (let i = 0; i < redTilePos.length; i++) {
        for (let j = i + 1; j < redTilePos.length; j++) {
            const [x1, y1] = redTilePos[i]!;
            const [x2, y2] = redTilePos[j]!;

            // normalizing
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);

            let valid = true;
            for (const [[ex1, ey1], [ex2, ey2]] of edges) {
                // more normalizing
                const eMinX = Math.min(ex1, ex2);
                const eMaxX = Math.max(ex1, ex2);
                const eMinY = Math.min(ey1, ey2);
                const eMaxY = Math.max(ey1, ey2);

                if (eMinX < maxX && eMaxX > minX && eMinY < maxY && eMaxY > minY) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                const area = (maxX - minX + 1) * (maxY - minY + 1);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
}
