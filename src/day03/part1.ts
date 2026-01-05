export async function main() {
    const banks = (await Bun.file("inputs/day03.txt").text()).trimEnd().split("\n");

    let result = 0;

    for (const bank of banks) {
        const batteries: number[] = new Array(2);
        const end = bank.length - 2;

        // initialize batteries with rightmost N digits
        for (let i = 0; i < 2; i++) {
            batteries[i] = bank.charCodeAt(end + i);
        }

        // process  digits right-to-left
        for (let i = end - 1; i >= 0; i--) {
            let next = bank.charCodeAt(i);
            let enable = true; // signal

            for (let j = 0; j < 2; j++) {
                if (!enable) {
                    // no swap
                    break;
                }

                const shouldSwap = next >= batteries[j]!;

                if (shouldSwap) {
                    const displaced = batteries[j];
                    batteries[j] = next;
                    next = displaced!;
                    enable = true;
                } else {
                    enable = false;
                }
            }
        }

        let joltage = 0;
        for (const b of batteries) {
            joltage = 10 * joltage + (b - 48);
        }
        result += joltage;
    }

    return result;
}
