function parseLine(line: string): [string[], number[][]] {
    const chunks = line.split(" ");

    const indicatorLightDiagram = chunks[0]!.slice(1, -1).split("");
    const buttonWiringSchematics = chunks
        .slice(1, -1)
        .map((pair) => pair.slice(1, -1).split(",").map(Number));

    return [indicatorLightDiagram, buttonWiringSchematics];
}

function* powerSetGenerator<T>(elements: T[]): Generator<T[]> {
    const n = elements.length;
    const totalSubarrays = 1 << n; // 2^N

    for (let i = 0; i < totalSubarrays; i++) {
        const subset: T[] = [];

        for (let j = 0; j < n; j++) {
            if ((i >> j) & 1) {
                subset.push(elements[j]!);
            }
        }

        yield subset;
    }
}

function generateIndicatorLightDiagram(buttonWiringSchematic: number[][], length: number): string {
    const diagram = new Array(length).fill(".");

    for (const button of buttonWiringSchematic) {
        for (const indicatorLight of button) {
            if (diagram[indicatorLight]! === "#") {
                diagram[indicatorLight]! = ".";
            } else {
                diagram[indicatorLight]! = "#";
            }
        }
    }

    return diagram.join("");
}

export async function main() {
    const input = (await Bun.file("inputs/day10.txt").text()).trimEnd().split("\n").map(parseLine);

    let result = 0;

    for (const [indicatorLightDiagram, buttonWiringSchematics] of input) {
        let minOperations = Infinity;
        for (const wiringConfiguration of powerSetGenerator(buttonWiringSchematics)) {
            if (
                generateIndicatorLightDiagram(wiringConfiguration, indicatorLightDiagram.length) ===
                indicatorLightDiagram.join("")
            ) {
                minOperations = Math.min(minOperations, wiringConfiguration.length);
            }
        }

        result += minOperations;
    }

    return result;
}
