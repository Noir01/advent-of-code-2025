export async function main() {
    const lines = (await Bun.file("inputs/day06.txt").text()).trimEnd().split("\n");
    const width = lines[0]!.length;
    const bottom = lines.length - 1;

    let result = 0;
    let right = width;

    // scan right-to-left
    for (let i = width - 1; i >= -1; i--) {
        // check if column i is an all-space delimiter (or we're at the start)
        let isDelimiter = i === -1;
        if (!isDelimiter) {
            isDelimiter = true;
            for (let y = 0; y <= bottom; y++) {
                if (lines[y]![i] !== " ") {
                    isDelimiter = false;
                    break;
                }
            }
        }

        if (!isDelimiter) continue;

        const left = i + 1;
        if (left >= right) {
            right = i;
            continue;
        }

        const op = lines[bottom]!.slice(left, right).includes("+") ? "+" : "*";

        // parse each row as a number
        let blockResult = op === "+" ? 0 : 1;
        for (let y = 0; y < bottom; y++) {
            const num = parseInt(lines[y]!.slice(left, right).trim(), 10);
            blockResult = op === "+" ? blockResult + num : blockResult * num;
        }

        result += blockResult;
        right = i;
    }

    return result;
}
