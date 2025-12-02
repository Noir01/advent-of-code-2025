export async function main() {
    const rawRanges = (await Bun.file("inputs/day02.txt").text()).trimEnd().split(",");

    let result = 0;
    for (const rawRange of rawRanges) {
        let [start, end] = rawRange.split("-").map((x) => parseInt(x, 10)) as [number, number];

        for (; start <= end; start++) {
            const rawStart = start.toString();

            if (rawStart.length % 2 !== 0) continue;

            const half = rawStart.length / 2;
            if (rawStart.slice(0, half) === rawStart.slice(half)) {
                result += start;
            }
        }
    }

    return result;
}
