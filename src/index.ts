import * as fs from 'node:fs';

function listFiles(path = '.' /*, indent = 0*/): string[] {
    let listOfFiles: string[] = [];
    fs.readdir(path, (err, files) => {
        if (err) {
            console.log('ERROR:  ', err);
            return;
        }
        console.log(listOfFiles);
        listOfFiles.push(...files);
        console.log(listOfFiles);
        // files
        //     // .filter(f => f !== 'node_modules')
        //     .forEach(file => {
        //         fs.stat(path + '/' + file, (err, stats) => {
        //             if (err) {
        //                 console.log('ERROR:  ', err);
        //                 return;
        //             }

        //             if (stats.isFile()) {
        //                 console.log(indent, 'file:', path + '/' + file);
        //             } else if (stats.isDirectory()) {
        //                 console.log(indent, 'directory:', path + '/' + file);
        //                 listFiles(path + '/' + file, indent + 1);
        //             }
        //         });
        //     });
    });
    return listOfFiles;
}

const files = listFiles();
// console.log(files);