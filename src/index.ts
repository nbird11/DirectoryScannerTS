// import * as fs from 'node:fs';

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
import * as fs from 'node:fs';
import {promisify} from 'node:util';
import {createInterface} from 'node:readline';
import {stdin, stdout} from 'node:process';
import {assert} from 'node:console';

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const rl = createInterface({
    input: stdin,
    output: stdout,
});

function logFile(indent: number, file: string, i: number, length: number) {
    // console.log(
    //     ((indent > 0 && i === length - 1)? '│'.repeat(indent - 2) + '└' : '│'.repeat(indent - 1)) + (i !== length - 1 ? '├─' : '└─'),
    //     file
    // );
    const isLastFile = i === length - 1;
    console.log(
        [...'│'.repeat(indent - 1)].join(' ') + ((indent > 1) ? ' ' : '') + ((isLastFile ? '└──' : '├──') + file)
    );
}

function logDir(indent: number, file: string) {
    console.log([...'│'.repeat(indent - 1)].join(' ') + ((indent > 1) ? ' ' : '') + ('├──' + `${file}/`));
}

async function listFiles(
    path: string = '.',
    indent: number = 1,
    showHidden: boolean = false
): Promise<void> {
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
                if (files[i] === 'node_modules') continue; // TODO
                if (!showHidden && files[i].startsWith('.')) continue;
                const stats = await statAsync(path + '/' + files[i]);
                if (stats.isFile()) {
                    logFile(indent, files[i], i, files.length);
                } else if (stats.isDirectory()) {
                    logDir(indent, files[i]);
                    await listFiles(
                        path + '/' + files[i],
                        indent + 1,
                        showHidden
                    );
                } else {
                    assert(false, 'There was something weird in a directory.');
                }
            } catch (err) {
                console.log('ERROR:\t', err);
            }
        }
    } catch (err) {
        console.log('ERROR:\t', err);
    }
}

async function main(): Promise<void> {
    const dir = await new Promise<string>(resolve => {
        rl.question(`Path from cwd to directory: `, resolve);
    });
    const hidden = await new Promise<string>(resolve => {
        rl.question('Show hidden files? (Y/n) ', resolve);
    });
    rl.close();
    rl.removeAllListeners();

    console.log();
    await listFiles(dir, 1, hidden.toUpperCase() === 'Y' ? true : false);
}

main();
