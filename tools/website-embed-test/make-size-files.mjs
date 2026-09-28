// Writes embed-size-<N>kb.html files for the website embed size test.
// Usage: node tools/website-embed-test/make-size-files.mjs 100 500
import { writeFileSync } from 'node:fs';

const sizes = process.argv.slice(2).map(Number).filter((n) => n > 0);
if (sizes.length === 0) {
  console.error('usage: node make-size-files.mjs <kilobytes> [<kilobytes> ...]');
  process.exit(2);
}
const filler = '/* filler to reach the test size ................................................ */\n';
for (const kb of sizes) {
  const head =
    `<!-- Toys embed size test, about ${kb} KB. Paste the whole file into an embed section. -->\n` +
    '<div style="font-family:sans-serif;padding:12px;border:2px solid #204153">' +
    `Size test ${kb} KB: <span id="ti-size-result">the script at the END of this block did not run, so the embed was cut short or refused.</span></div>\n<script>\n`;
  const tail = `\ndocument.getElementById("ti-size-result").textContent = "the whole ${kb} KB block arrived and ran.";\n</script>\n`;
  const count = Math.max(0, Math.floor((kb * 1024 - head.length - tail.length) / filler.length));
  const name = `embed-size-${kb}kb.html`;
  writeFileSync(name, head + filler.repeat(count) + tail);
  console.log(`wrote ${name}`);
}
