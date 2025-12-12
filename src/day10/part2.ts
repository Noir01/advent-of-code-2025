/**
 * NOTE: This solution requires Node 20+ due to z3-solver WASM compatibility.
 * Bun doesn't work (see https://github.com/oven-sh/bun/issues/25454 and https://github.com/oven-sh/bun/issues/19453)
 *
 * Run with: npx tsx src/day10/part2.ts
 * (Make sure to `nvm use 20` first)
 */

import { readFileSync } from "node:fs";
import { init } from "z3-solver";

function parseLine(line: string): [number[][], number[]] {
    const chunks = line.split(" ");
    const buttonWiringSchematics = chunks
        .slice(1, -1)
        .map((pair) => pair.slice(1, -1).split(",").map(Number));
    const joltageRequirements = chunks[chunks.length - 1]!.slice(1, -1).split(",").map(Number);
    return [buttonWiringSchematics, joltageRequirements];
}

export async function main() {
    const { Context } = await init();
    const Z3 = Context("main");

    const input = readFileSync("inputs/day10.txt", "utf-8").trimEnd().split("\n").map(parseLine);

    let totalResult = 0;

    for (const [buttons, targets] of input) {
        const optimizer = new Z3.Optimize();

        // variables
        const presses = buttons.map((_, i) => Z3.Int.const(`b${i}`));

        // contraint: non-negative presses
        for (const p of presses) {
            optimizer.add(p.ge(0));
        }

        // constraint: each position must reach its target
        for (let pos = 0; pos < targets.length; pos++) {
            const contributions = presses.filter((_, i) => buttons[i]!.includes(pos));

            if (contributions.length > 0) {
                optimizer.add(
                    Z3.Sum(
                        ...(contributions as [(typeof contributions)[0], ...typeof contributions]),
                    ).eq(targets[pos]!),
                );
            } else if (targets[pos] !== 0) {
                return Infinity; // Impossible - no buttons affect this position
            }
        }

        const totalPresses = Z3.Sum(...(presses as [(typeof presses)[0], ...typeof presses]));
        optimizer.minimize(totalPresses);

        await optimizer.check();

        const model = optimizer.model();
        const result = model.eval(totalPresses);
        totalResult += Number(result.toString());
    }

    console.log(totalResult);

    Z3.interrupt();
}

main().catch(console.error);
