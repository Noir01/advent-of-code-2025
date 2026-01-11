export async function main() {
    const lines = (await Bun.file("inputs/day06.txt").text()).trimEnd().split("\n");
    const width = lines[0]!.length;
    const bottom = lines.length - 1;

    let result = 0;
    let right = width;

    for (let i = width - 1; i >= -1; i--) {
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

        // parse each column as a vertical number
        let blockResult = op === "+" ? 0 : 1;
        for (let x = left; x < right; x++) {
            let colStr = "";
            for (let y = 0; y < bottom; y++) {
                colStr += lines[y]![x];
            }
            const num = parseInt(colStr, 10); // parseInt stops at first non-digit
            if (!Number.isNaN(num)) {
                blockResult = op === "+" ? blockResult + num : blockResult * num;
            }
        }

        result += blockResult;
        right = i;
    }

    return result;
}
