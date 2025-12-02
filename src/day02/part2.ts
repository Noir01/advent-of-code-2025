function splitRange(n: number, k: number): [number, number][] {
    const chunkSize = n / k;
    const ranges: [number, number][] = [];

    for (let i = 0; i < k; i++) {
        ranges.push([i * chunkSize, (i + 1) * chunkSize - 1]);
    }

    return ranges;
}

export async function main() {
    const rawRanges = (await Bun.file("inputs/day02.txt").text()).trimEnd().split(",");

    let result = 0;
    for (const rawRange of rawRanges) {
        let [start, end] = rawRange.split("-").map((x) => parseInt(x, 10)) as [number, number];

        for (; start <= end; start++) {
            const rawStart = start.toString();
            const n = rawStart.length;

            for (let i = 2; i <= n; i++) {
                if (n % i !== 0) continue;
                const ranges = splitRange(n, i).map(([left, right]) =>
                    rawStart.slice(left, right + 1),
                );
                if (ranges.every((x) => x === ranges[0])) {
                    result += start;
                    break;
                }
            }
        }
    }

    return result;
}
