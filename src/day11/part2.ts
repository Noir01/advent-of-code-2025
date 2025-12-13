function countPaths(
    node: string,
    target: string,
    adjacencyList: Record<string, string[]>,
    memo: Record<string, number> = {},
): number {
    if (node === target) return 1;
    if (node in memo) return memo[node]!;

    // Safety check: if node is a dead end
    if (!(node in adjacencyList)) return 0;

    let total = 0;
    for (const neighbor of adjacencyList[node]!) {
        total += countPaths(neighbor, target, adjacencyList, memo);
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

    const leg1_A = countPaths("svr", "dac", adjacencyList);
    const leg2_A = countPaths("dac", "fft", adjacencyList);
    const leg3_A = countPaths("fft", "out", adjacencyList);
    const totalOrderA = leg1_A * leg2_A * leg3_A;

    const leg1_B = countPaths("svr", "fft", adjacencyList);
    const leg2_B = countPaths("fft", "dac", adjacencyList);
    const leg3_B = countPaths("dac", "out", adjacencyList);
    const totalOrderB = leg1_B * leg2_B * leg3_B;

    console.log(totalOrderA + totalOrderB);
}
