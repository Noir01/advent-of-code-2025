export async function main() {
    const document = (await Bun.file("inputs/day01.txt").text()).trimEnd().split("\n");

    let dial = 50;
    let result = 0;

    for (const rotation of document) {
        const rot = parseInt(rotation.slice(1), 10);

        if (rotation.charAt(0) === "L") {
            dial -= rot;
        } else {
            dial += rot;
        }

        dial = ((dial % 100) + 100) % 100;

        if (dial === 0) {
            result++;
        }
    }

    return result;
}
