export async function main() {
    const banks = (await Bun.file("inputs/day03.txt").text()).trimEnd().split("\n");

    let result = 0;
    const n = banks[0]!.length;

    for (const bank of banks) {
        let best = -1;
        for (let i = 9; i >= 0; i--) {
            const digit = i;
            const indices = [...bank]
                .map((c, idx) => (c === digit.toString() ? idx : -1))
                .filter((idx) => idx !== -1);

            for (const index of indices) {
                if (index === n - 1) {
                    continue;
                }

                const firstDigit = bank[index];
                const secondDigit = Math.max(
                    ...bank
                        .slice(index + 1)
                        .split("")
                        .map(Number),
                );

                const battery = parseInt(firstDigit! + secondDigit, 10);

                if (battery > best) {
                    // console.log(`Found new best battery ${battery} for bank ${bank}`);
                    best = battery;
                }
            }

            if (best !== -1) {
                break;
            }
        }
        result += best;
    }

    return result;
}
