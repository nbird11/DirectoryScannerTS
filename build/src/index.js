"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs"); // For file system methods
const node_util_1 = require("node:util"); // For making functions work synchronously
const node_console_1 = require("node:console"); // For catching weird items in a directory
// Create promisified versions of the fs functions for readdir and
// stat so I can use await to get the results synchronously.
const readdirAsync = (0, node_util_1.promisify)(node_fs_1.readdir);
const statAsync = (0, node_util_1.promisify)(node_fs_1.stat);
const colors = [
    '\x1b[34m',
    '\x1b[32m',
    '\x1b[36m',
    '\x1b[33m',
    '\x1b[35m',
    '\x1b[31m', // Red
];
function getColor(indent) {
    return colors[(indent - 1) % colors.length];
}
function buildIndentation(indent) {
    let indentation = '';
    for (let i = 1; i < indent; i++) {
        indentation += colors[(i - 1) % colors.length] + '│ ' + '\x1b[0m';
    }
    return indentation;
}
/**
 * Outputs a line containing the name of the file to the display.
 * @param indent The depth of the file from root.
 * @param file The name of the file.
 * @param isLastFile Whether the file is the last one in the current directory.
 */
function logFile(indent, file, isLastFile) {
    const indentation = buildIndentation(indent);
    const color = getColor(indent);
    console.log(indentation + color + (isLastFile ? '└─' : '├─') + '\x1b[0m' + file);
}
/**
 * Outputs a line containing the name of the directory to the display.
 * @param indent The depth of the dir from root.
 * @param dir The name of the dir.
 */
function logDir(indent, dir) {
    const indentation = buildIndentation(indent);
    const color = getColor(indent);
    console.log(indentation + color + '├─' + '\x1b[0m' + `${dir}/`);
}
/**
 * Recursive function that lists all the files and directories from the
 * specified path.
 * @param path Directory from which the files are read.
 * @param indent Depth of files from root directory.
 * @param showHidden Whether to show hidden files and directories or not.
 */
async function listFiles(path = '.', indent = 1, showHidden = false) {
    try {
        const files = await readdirAsync(path);
        // On first pass, display the full path of specified relative path.
        if (indent === 1) {
            const savedDir = process.cwd();
            process.chdir(path);
            console.log(process.cwd());
            process.chdir(savedDir);
        }
        for (let i = 0; i < files.length; ++i) {
            if (files[i] === 'node_modules')
                continue;
            if (!showHidden && files[i].startsWith('.'))
                continue;
            const stats = await statAsync(path + '/' + files[i]); // Using '/' for consistency across systems
            if (stats.isFile()) {
                const lastFile = i === files.length - 1;
                logFile(indent, files[i], lastFile);
            }
            else if (stats.isDirectory()) {
                logDir(indent, files[i]);
                await listFiles(path + '/' + files[i], indent + 1, showHidden);
            }
            else {
                (0, node_console_1.assert)(false, 'There was something weird in a directory.');
            }
        }
    }
    catch (err) {
        console.error('ERROR:\t', err);
    }
}
async function main() {
    const args = process.argv.slice(2);
    let path;
    if (args[0]) {
        path = args[0];
    }
    else {
        console.error("No path specified.");
        return;
    }
    const showHidden = args.includes('--show-hidden');
    console.log();
    await listFiles(path, 1, showHidden);
}
main();
//# sourceMappingURL=index.js.map