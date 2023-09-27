"use strict";
// import * as fs from 'node:fs';
Object.defineProperty(exports, "__esModule", { value: true });
// function listFiles(path = '.' /*, indent = 0*/): void {
//     console.log(1);
//     fs.readdir(path, (err, files) => {
//         if (err) {
//             console.log('ERROR:  ', err);
//             return;
//         }
//         console.log(2);
//         // files
//         //     // .filter(f => f !== 'node_modules')
//         //     .forEach(file => {
//         //         fs.stat(path + '/' + file, (err, stats) => {
//         //             if (err) {
//         //                 console.log('ERROR:  ', err);
//         //                 return;
//         //             }
//         //             if (stats.isFile()) {
//         //                 console.log(indent, 'file:', path + '/' + file);
//         //             } else if (stats.isDirectory()) {
//         //                 console.log(indent, 'directory:', path + '/' + file);
//         //                 listFiles(path + '/' + file, indent + 1);
//         //             }
//         //         });
//         //     });
//     });
// }
// function main(): void {
//     listFiles();
//     console.log(3);
// }
// main();
// Async/Await version
const fs = require("node:fs");
const node_util_1 = require("node:util");
const node_readline_1 = require("node:readline");
const node_process_1 = require("node:process");
const node_console_1 = require("node:console");
const readdirAsync = (0, node_util_1.promisify)(fs.readdir);
const statAsync = (0, node_util_1.promisify)(fs.stat);
const rl = (0, node_readline_1.createInterface)({
    input: node_process_1.stdin,
    output: node_process_1.stdout,
});
function logFile(indent, file, i, length) {
    console.log('│'.repeat(indent - 1) + (i !== length - 1 ? '├─' : '└─'), file);
}
function logDir(indent, file) {
    console.log('│'.repeat(indent - 1) + '├─', file + '\\');
}
async function listFiles(path, indent, showHidden) {
    try {
        const files = await readdirAsync(path);
        if (indent === 1) {
            const savedDir = process.cwd();
            process.chdir(path);
            console.log(process.cwd());
            process.chdir(savedDir);
        }
        for (let i = 0; i < files.length; ++i) {
            try {
                if (files[i] === 'node_modules')
                    continue; // TODO
                if (!showHidden && files[i].startsWith('.'))
                    continue;
                const stats = await statAsync(path + '/' + files[i]);
                if (stats.isFile()) {
                    logFile(indent, files[i], i, files.length);
                }
                else if (stats.isDirectory()) {
                    logDir(indent, files[i]);
                    await listFiles(path + '/' + files[i], indent + 1, showHidden);
                }
                else {
                    (0, node_console_1.assert)(false, 'There was something weird in a directory.');
                }
            }
            catch (err) {
                console.log('ERROR:\t', err);
            }
        }
    }
    catch (err) {
        console.log('ERROR:\t', err);
    }
}
async function main() {
    const dir = await new Promise(resolve => {
        rl.question(`Path from cwd (${process.cwd()}) to directory: `, resolve);
    });
    const hidden = await new Promise(resolve => {
        rl.question('Show hidden files? (Y/n) ', resolve);
    });
    rl.close();
    rl.removeAllListeners();
    console.log();
    await listFiles(dir, 1, hidden.toUpperCase() === 'y' ? true : false);
}
main();
//# sourceMappingURL=index.js.map