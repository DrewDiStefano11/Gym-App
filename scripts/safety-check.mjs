import fs from 'fs';
import path from 'path';

const FORBIDDEN_EXTENSIONS = ['.bak', '.conflictbak', '.dupbak', '.mergebak'];
const CONFLICT_MARKERS = ['<<<<' + '<<<', '====' + '===', '>>>>' + '>>>'];
const FORBIDDEN_KEYS = [
  /sk-[a-zA-Z0-9]{20,}/,
  /AIza[a-zA-Z0-9\-_]{35}/,
  /OPENAI_API_KEY=\s*['"]?[a-zA-Z0-9\-]+['"]?/,
  /GEMINI_API_KEY=\s*['"]?[a-zA-Z0-9\-]+['"]?/
];

let failures = [];

function checkFileContent(filePath) {
  // Don't check the safety-check script itself for conflict markers
  // so we can define them as constants.
  const isSafetyCheckScript = filePath.includes('safety-check.mjs');

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Conflict markers
    if (!isSafetyCheckScript) {
      CONFLICT_MARKERS.forEach(marker => {
        if (line.includes(marker)) {
          failures.push(`${filePath}:${index + 1} Found conflict marker: ${marker}`);
        }
      });
    }

    // API Keys
    FORBIDDEN_KEYS.forEach(regex => {
      if (regex.test(line)) {
        // Exclude generic placeholder patterns if they don't look like real keys
        // For this task, we assume any match is a failure as per requirements
        failures.push(`${filePath}:${index + 1} Likely hardcoded API key found`);
      }
    });

    // console.log in src/app.js
    if (filePath === 'src/app.js' && line.includes('console.log')) {
      if (!line.includes('// intentional')) {
        failures.push(`${filePath}:${index + 1} Unauthorized console.log found (use // intentional if required)`);
      }
    }
  });
}

function walkRepo(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === '.git' || file === 'node_modules') return;
      walkRepo(fullPath);
    } else {
      // Check extensions
      const ext = path.extname(file);
      if (FORBIDDEN_EXTENSIONS.includes(ext)) {
        failures.push(`${fullPath} Forbidden file extension: ${ext}`);
      }

      // Check .env files
      if (file === '.env' || file.endsWith('.env')) {
        failures.push(`${fullPath} Committed .env file found`);
      }

      // Check duplicate backup files in src/
      if (dir.startsWith('src') && (file.includes('-backup') || /\s\(\d+\)\./.test(file))) {
        failures.push(`${fullPath} Likely duplicate/backup file in src/`);
      }

      // Check content for text files
      const textExtensions = ['.js', '.mjs', '.css', '.html', '.json', '.md', '.yml', '.yaml'];
      if (textExtensions.includes(ext)) {
        checkFileContent(fullPath);
      }
    }
  });
}

console.log('Starting FitCore Safety Check...');
walkRepo('.');

if (failures.length > 0) {
  console.error('\x1b[31mSafety Check Failed:\x1b[0m');
  failures.forEach(f => console.error(` - ${f}`));
  process.exit(1);
} else {
  console.log('\x1b[32mSafety Check Passed: Repo is clean.\x1b[0m');
  process.exit(0);
}
