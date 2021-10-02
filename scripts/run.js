require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
});

const path = require("path");
console.log(process.argv[2]);
const run = require(path.join(__dirname, process.argv[2]));
