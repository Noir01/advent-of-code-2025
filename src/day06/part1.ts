export async function main() {
    const lines = (await Bun.file("inputs/day06.txt").text()).trimEnd().split("\n");

    const n = lines[0]!.length;

    let i = 0;
    let j = 0;

    let result = 0;

    for (; i <= n; i++) {
        if (i < n && !lines.map((lines) => lines[i]).every((char) => char === " ")) {
            continue;
        }

        const rawEquation = lines.map((lines) => lines!.slice(j, i));

        const numbers = rawEquation.slice(0, 4).map((rawNumber) => parseInt(rawNumber.trim(), 10));
        const operator = rawEquation[4]!.trim();

        if (operator === "+") {
            result += numbers.reduce((acc, curr) => acc + curr, 0);
        } else if (operator === "*") {
            result += numbers.reduce((acc, curr) => acc * curr, 1);
        }

        j = i;
    }

    console.log(result);
}
