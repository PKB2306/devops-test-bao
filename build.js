// Build don gian: kiem tra source roi copy src/ -> dist/
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");

const indexPath = path.join(SRC, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("ERROR: khong tim thay src/index.html");
  process.exit(1);
}

const html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("</html>")) {
  console.error("ERROR: src/index.html thieu the dong </html>");
  process.exit(1);
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(SRC, DIST, { recursive: true });
console.log("Build OK -> dist/");
