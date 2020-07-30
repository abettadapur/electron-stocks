const fs=require("fs");
const path=require("path");
const ejs=require("ejs");

const entryDirectory = path.join(
  __dirname,
  "..",
  "packages",
  "frontend",
  "src",
  "entry"
);

/**
 * Return handlebar template
 */
function getTemplate() {
  return ejs.compile(
    fs.readFileSync(path.join(__dirname, "htmlTemplate.html.ejs")).toString()
  );
}

/**
 * Generates development html files
 * In development, we do not split chunks for simplicity
 */
function generateDevelopmentHtml() {
  const outputDirectory = path.join(
    __dirname,
    "..",
    "packages",
    "main",
    "html"
  );

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  const entryFiles = getEntryPoints();
  for (const entryFile of entryFiles) {
    const output = getTemplate()({
      devEntry: entryFile,
      splash: false,
      dev: true,
      host: "http://localhost:9000",
    });
    fs.writeFileSync(path.join(outputDirectory, `${entryFile}.html`), output);
  }
}

function getEntryPoints() {
  return getJsFiles(entryDirectory, ".tsx");
}

function getJsFiles(directory, extension) {
  let files = fs.readdirSync(directory);

  files = files
    .filter((file) => {
      return (
        !fs.statSync(path.join(directory, file)).isDirectory() &&
        file.endsWith(extension)
      );
    })
    .map((e) => path.basename(e, extension));

  return files;
}

module.exports = {
  getEntryPoints,
  generateDevelopmentHtml
}
