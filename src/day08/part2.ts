class UnionFind {
    private parent: number[];
    private size: number[];

    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.size = Array(size).fill(1);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]!);
        }

        return this.parent[x];
    }

    union(x: number, y: number) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return;

        this.size[rootY]! += this.size[rootX]!;
        this.parent[rootX] = rootY;
    }

    connected(x: number, y: number) {
        return this.find(x) === this.find(y);
    }

    getMaxSetSize(): number {
        let maxSize = 0;
        for (let i = 0; i < this.parent.length; i++) {
            if (this.parent[i] === i) {
                maxSize = Math.max(maxSize, this.size[i]!);
            }
        }
        return maxSize;
    }
}

export async function main() {
    const unsortedJunctionBoxes = (await Bun.file("inputs/day08.txt").text())
        .trimEnd()
        .split("\n")
        .map((pos) => pos.split(",").map(Number) as [number, number, number]);

    const sortedJunctionBoxesDistancesXCoords = [];

    for (let i = 0; i < unsortedJunctionBoxes.length; i++) {
        for (let j = i + 1; j < unsortedJunctionBoxes.length; j++) {
            const [x1, y1, z1] = unsortedJunctionBoxes[i]!;
            const [x2, y2, z2] = unsortedJunctionBoxes[j]!;
            const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
            sortedJunctionBoxesDistancesXCoords.push([
                i,
                j,
                dist,
                unsortedJunctionBoxes[i]![0],
                unsortedJunctionBoxes[j]![0],
            ]);
        }
    }

    sortedJunctionBoxesDistancesXCoords.sort((a, b) => a[2]! - b[2]!);

    const uf = new UnionFind(unsortedJunctionBoxes.length);

    let lastTwoJunctionsConnectedX: number[] = [];
    for (let i = 0; i < sortedJunctionBoxesDistancesXCoords.length; i++) {
        const x = sortedJunctionBoxesDistancesXCoords[i]!;

        if (!uf.connected(x[0]!, x[1]!)) {
            uf.union(x[0]!, x[1]!);
            lastTwoJunctionsConnectedX = [x[3]!, x[4]!];
        } else {
            if (uf.getMaxSetSize() === unsortedJunctionBoxes.length) {
                break;
            }
        }
    }

    const result = lastTwoJunctionsConnectedX[0]! * lastTwoJunctionsConnectedX[1]!;

    return result;
}
