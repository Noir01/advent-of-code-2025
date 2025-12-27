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
    [11, 0], // 11
    [2, 3], // 12
    [13, 0], // 13
];

const POW10 = Array.from({ length: 19 }, (_, i) => 10n ** BigInt(i));

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

        // ff a length has two distinct prime factors (Len 6 has 2 & 3)
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
