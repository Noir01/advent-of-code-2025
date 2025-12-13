// src/run.ts

import { $ } from "bun";

const [, , dayArgRaw, partArgRaw] = Bun.argv;

// Solutions that require Node instead of Bun
const nodeOnlySolutions: Record<string, string> = {
    "10-2": "Uses z3-solver which requires Node 20+ (Bun WASM bug)",
};

// Days configuration
const TOTAL_DAYS = 12;
const DAYS_WITHOUT_PART2 = new Set([12]);

async function runSingleSolution(day: string, part: string): Promise<string | null> {
    const modulePath = `./day${day}/part${part}.ts`;

    try {
        const mod = await import(modulePath);

        const entry =
            (mod as { main?: () => unknown; default?: () => unknown }).main ??
            (mod as { default?: () => unknown }).default;

        if (typeof entry !== "function") {
            return null;
        }

        const result = await entry();
        return result !== undefined ? String(result) : null;
    } catch {
        return null;
    }
}

async function runDay10Part2(): Promise<string> {
    // Check if npx is available
    let npxAvailable = false;
    try {
        await $`which npx`.quiet();
        npxAvailable = true;
    } catch {
        npxAvailable = false;
    }

    // If npx not available, try loading nvm
    if (!npxAvailable) {
        try {
            await $`bash -c "source ~/.nvm/nvm.sh && which npx"`.quiet();
        } catch {
            return "Error: npx not available";
        }
    }

    // Check node version and run with appropriate setup
    try {
        const result =
            await $`bash -c "source ~/.nvm/nvm.sh && nvm use 20 >/dev/null 2>&1; npx tsx src/day10/part2.ts"`.quiet();
        return result.text().trim();
    } catch {
        return "Error: Failed to run";
    }
}

async function runAllDays(): Promise<void> {
    console.log("\x1b[1m\x1b[36m✨ Advent of Code 2025 ✨\x1b[0m\n");
    console.log("\x1b[90m─────────────────────────────────\x1b[0m");

    for (let d = 1; d <= TOTAL_DAYS; d++) {
        const day = String(d).padStart(2, "0");
        const hasPart2 = !DAYS_WITHOUT_PART2.has(d);

        // Run Part 1
        const p1 = await runSingleSolution(day, "1");

        // Run Part 2
        let p2: string | null = null;
        if (hasPart2) {
            if (`${day}-2` in nodeOnlySolutions) {
                // Special case: Day 10 Part 2 needs Node
                p2 = await runDay10Part2();
            } else {
                p2 = await runSingleSolution(day, "2");
            }
        }

        // Pretty print
        const dayLabel = `\x1b[1m\x1b[33mDay ${day}\x1b[0m`;
        const p1Display = p1 !== null ? `\x1b[32m${p1}\x1b[0m` : "\x1b[31m-\x1b[0m";
        const p2Display = hasPart2
            ? p2 !== null
                ? `\x1b[32m${p2}\x1b[0m`
                : "\x1b[31m-\x1b[0m"
            : "\x1b[35mMerry Christmas!\x1b[0m";

        console.log(`${dayLabel}  │  P1: ${p1Display}`);
        console.log(`        │  P2: ${p2Display}`);
    }

    console.log("\x1b[90m─────────────────────────────────\x1b[0m");
    console.log("\x1b[1m\x1b[32m✓ Complete!\x1b[0m\n");
}

async function runSpecificDay(dayArgRaw: string, partArgRaw: string): Promise<void> {
    // Normalise day: allow "day01" or "1" → "01"
    const dayNumber = dayArgRaw.toLowerCase().replace(/^day/, "");
    const day = dayNumber.padStart(2, "0");

    // Normalise part: allow "part1" or "1" → "1"
    const part = partArgRaw.toLowerCase().replace(/^part/, "");

    const key = `${day}-${part}`;
    if (nodeOnlySolutions[key]) {
        console.error(`\x1b[33m⚠️  Day ${day} Part ${part} cannot run with Bun.\x1b[0m`);
        console.error(`   Reason: ${nodeOnlySolutions[key]}`);
        console.error("");
        console.error("   Run instead with:");
        console.error(`   \x1b[36mnvm use 20 && npx tsx src/day${day}/part${part}.ts\x1b[0m`);
        process.exit(1);
    }

    const modulePath = `./day${day}/part${part}.ts`;

    try {
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
        if (result !== undefined) {
            console.log(result);
        }
    } catch (err) {
        console.error(`Failed to run ${modulePath}`);
        console.error(err);
        process.exit(1);
    }
}

async function main() {
    if (!dayArgRaw && !partArgRaw) {
        // No arguments: run all days
        await runAllDays();
    } else if (!dayArgRaw || !partArgRaw) {
        // Partial arguments: show usage
        console.error("Usage: bun run aoc <day> <part>");
        console.error("       bun run aoc              (runs all days)");
        console.error("Examples:");
        console.error("  bun run aoc day01 part1");
        console.error("  bun run aoc 1 2");
        process.exit(1);
    } else {
        // Specific day and part
        await runSpecificDay(dayArgRaw, partArgRaw);
    }
}

void main();
