const PRIME_FACTORS = [
    [1, 0], // 1
    [2, 0], // 2
    [3, 0], // 3
    [2, 0], // 4
    [5, 0], // 5
    [2, 3], // 6
    [7, 0], // 7
    [2, 0], // 8
    [3, 0], // 9
    [2, 5], // 10
];

const POW10 = [
    1n, // 10^0
    10n, // 10^1
    100n, // 10^2
    1000n, // 10^3
    10000n, // 10^4
    100000n, // 10^5
    1000000n, // 10^6
    10000000n, // 10^7
    100000000n, // 10^8
    1000000000n, // 10^9
    10000000000n, // 10^10
];

function sumInvalidIdsForRange(start: bigint, end: bigint): bigint {
    let count = 0n;

    const lenStart = start.toString().length;
    const lenEnd = end.toString().length;

    for (let len = lenStart; len <= lenEnd; len++) {
        if (len === 1) continue;

        const primes = PRIME_FACTORS[len - 1];

        for (const prime of primes!) {
            if (prime === 0) continue;

            const digits = len / prime;
            count += sumSeries(start, end, len, digits);
        }

        // if a length has two distinct prime factors (Len 6 has 2 & 3)
        // subtract the "1-digit repeat" overlap to correct it
        if (primes![0] !== 0 && primes![1] !== 0) {
            count -= sumSeries(start, end, len, 1);
        }
    }
    return count;
}

function sumSeries(start: bigint, end: bigint, len: number, digits: number): bigint {
    // special number
    const f = (POW10[len]! - 1n) / (POW10[digits]! - 1n);

    const minLenVal = POW10[len - 1]!;
    const maxLenVal = POW10[len]!;

    // we want the smallest 'a' where (a * f) >= start
    // and (a * f) must be at least the smallest number with 'len' digits
    const effectiveStart = start > minLenVal ? start : minLenVal;
    // Ceiling division: (num + div - 1) / div
    const a = (effectiveStart + f - 1n) / f;

    // we want the largest 'b' where (b * f) <= end
    const effectiveEnd = end < maxLenVal ? end : maxLenVal - 1n; // -1n because maxLenVal is exclusive
    const b = effectiveEnd / f;

    if (b < a) return 0n;

    // arithmetic series
    const termB = b * (b + 1n);
    const termA = a * (a - 1n);

    return (f * (termB - termA)) / 2n;
}

export async function main() {
    const input = await Bun.file("inputs/day02.txt").text();

    const ranges = input.trim().split(",");
    let total = 0n;

    for (const rawRange of ranges) {
        const [startStr, endStr] = rawRange.split("-");
        const start = BigInt(startStr!);
        const end = BigInt(endStr!);
        total += sumInvalidIdsForRange(start, end);
    }

    return total;
}
