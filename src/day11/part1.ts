function countPaths(
    node: string,
    adjacencyList: Record<string, string[]>,
    memo: Record<string, number> = {},
): number {
    if (node === "out") return 1;
    if (node in memo) return memo[node]!;
    if (!(node in adjacencyList)) return 0;

    let total = 0;
    for (const neighbor of adjacencyList[node]!) {
        total += countPaths(neighbor, adjacencyList, memo);
    }
    memo[node] = total;
    return total;
}

export async function main() {
    const rawAdjacencyList = (await Bun.file("inputs/day11.txt").text())
        .trimEnd()
        .split("\n")
        .map((pos) => pos.split(":").map((x) => x.trim()));

    const adjacencyList: Record<string, string[]> = {};
    for (const [node, neighbors] of rawAdjacencyList) {
        adjacencyList[node!] = neighbors!.split(" ").map((x) => x.trim());
    }

    return countPaths("you", adjacencyList);
}
