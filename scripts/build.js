var MetaScript = require("../../MetaScript/MetaScript.js"),
    path = require("path"),
    fs = require("fs");

var rootDir = path.join(__dirname, ".."),
    srcDir = path.join(__dirname, "..", "src"),
    distDir = path.join(__dirname, "..", "dist"),
    pkg = require(path.join(rootDir, "package.json")),
    filename;

var scope = {
    INTN_STANDALONE: true
};

// Build standalone
console.log("Building IntN standalone with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(distDir, "IntN.js"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "IntN.js")), filename, scope, srcDir)
);

// Build embeddable
scope.INTN_STANDALONE = false;
console.log("Building IntN embeddable with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(distDir, "IntN-embeddable.js"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "IntN-embeddable.js")), filename, scope, srcDir)
);

// Update bower.json
scope = { VERSION: pkg.version };
console.log("Updating bower.json with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(rootDir, "bower.json"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "bower.json")), filename, scope, srcDir)
);

console.log("Done");
