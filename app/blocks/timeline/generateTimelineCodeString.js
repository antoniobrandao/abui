/**
 * Script to generate timelineCodeString.ts from registry/abui/ui/timeline.tsx
 *
 * This script reads the timeline.tsx file and creates a properly escaped string
 * that can be used in code examples. It escapes:
 * - Backticks (`) → \`
 * - Template literal expressions (${) → \${
 * - Backslashes (\) → \\
 *
 * Usage: node generateTimelineCodeString.js
 */

import fs from "fs"
import path from "path"

// Read the timeline.tsx file
const timelinePath = path.join(__dirname, "../../../registry/abui/ui/timeline.tsx")
const content = fs.readFileSync(timelinePath, "utf8")

// Escape backticks and template literal expressions
// We need to escape:
// 1. Backslashes first: \ → \\
// 2. Backticks: ` → \`
// 3. ${ sequences: ${ → \${ (to prevent evaluation in the outer template literal)
let escaped = content
escaped = escaped.replace(/\\/g, "\\\\") // Escape backslashes first
escaped = escaped.replace(/`/g, "\\`") // Escape backticks
escaped = escaped.replace(/\$\{/g, "\\${") // Escape ${ sequences

// Create the output string
const output = `export const timelineCodeString = \`${escaped}\`;`

// Write to file
const outputPath = path.join(__dirname, "timelineCodeString.ts")
fs.writeFileSync(outputPath, output, "utf8")

console.log("✅ Successfully generated timelineCodeString.ts")
console.log(`   Source: ${timelinePath}`)
console.log(`   Output: ${outputPath}`)
