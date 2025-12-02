export async function main() {
    const document = (await Bun.file("inputs/day01.txt").text()).trimEnd().split("\n");

    let dial = 50;
    let result = 0;

    for (const rotation of document) {
        const rot = parseInt(rotation.slice(1), 10);

        if (rotation.charAt(0) === "L") {
            if (dial === 0) {
                result += Math.floor(rot / 100);
            } else if (rot >= dial) {
                result += Math.floor((rot - dial) / 100) + 1;
            }

            dial = (((dial - rot) % 100) + 100) % 100;
        } else {
            result += Math.floor((dial + rot) / 100);
            dial = (dial + rot) % 100;
        }
    }

    return result;
}
