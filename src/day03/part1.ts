export async function main() {
    const banks = (await Bun.file("inputs/day03.txt").text()).trimEnd().split("\n");

    let result = 0;

    for (const bank of banks) {
        const toDrop = bank.length - 2;
        const stack = [];
        let dropped = 0;

        for (const ch of bank) {
            while (dropped < toDrop && stack.length > 0 && stack[stack.length - 1]! < ch) {
                stack.pop();
                dropped++;
            }
            stack.push(ch);
        }

        while (dropped < toDrop) {
            stack.pop();
            dropped++;
        }

        result += parseInt(stack.join(""), 10);
    }

    return result;
}
