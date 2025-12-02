// src/run.ts

const [, , dayArgRaw, partArgRaw] = Bun.argv;

if (!dayArgRaw || !partArgRaw) {
    console.error("Usage: bun run aoc <day> <part>");
    console.error("Examples:");
    console.error("  bun run aoc day01 part1");
    console.error("  bun run aoc 1 2");
    process.exit(1);
}

// Normalise day: allow "day01" or "1" → "01"
const dayNumber = dayArgRaw.toLowerCase().replace(/^day/, "");
const day = dayNumber.padStart(2, "0");

// Normalise part: allow "part1" or "1" → "1"
const partNumber = partArgRaw.toLowerCase().replace(/^part/, "");
const part = partNumber;

const modulePath = `./day${day}/part${part}.ts`;

async function main() {
    try {
        // Bun can import TS directly
        const mod = await import(modulePath);

        const entry =
            (mod as { main?: () => unknown; default?: () => unknown }).main ??
            (mod as { default?: () => unknown }).default;

        if (typeof entry !== "function") {
            console.error(
                `Module ${modulePath} does not export a 'main' function or default function.`,
            );
            process.exit(1);
        }

        const result = await entry();
        // If main returns something, print it (handy when you just compute an answer)
        if (result !== undefined) {
            console.log(result);
        }
    } catch (err) {
        console.error(`Failed to run ${modulePath}`);
        console.error(err);
        process.exit(1);
    }
}

void main();
