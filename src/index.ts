import {readdir, stat} from 'node:fs'; // For file system methods
import {promisify} from 'node:util'; // For making functions work synchronously
import {createInterface} from 'node:readline'; // For getting input from user
import {assert} from 'node:console'; // For catching weird items in a directory

// Create promisified versions of the fs functions for readdir and
// stat so I can use await to get the results synchronously.
const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

// Create the readline interface.
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Outputs a line containing the name of the file to the display.
 * @param indent The depth of the file from root.
 * @param file The name of the file.
 * @param isLastFile Whether the file is the last one in the current directory.
 */
function logFile(indent: number, file: string, isLastFile: boolean): void {
  console.log(
    // Indent is used to determine the number of vertical lines needed before the file.
    '│ '.repeat(indent - 1) + ((isLastFile ? '└─' : '├─') + file)
  );
}

/**
 * Outputs a line containing the name of the directory to the display.
 * @param indent The depth of the dir from root.
 * @param dir The name of the dir.
 */
function logDir(indent: number, dir: string): void {
  console.log('│ '.repeat(indent - 1) + ('├─' + `${dir}/`));
}

/**
 * Recursive function that lists all the files and directories from the
 * specified path.
 * @param path Directory from which the files are read.
 * @param indent Depth of files from root directory.
 * @param showHidden Whether to show hidden files and directories or not.
 */
async function listFiles(
  path = '.',
  indent = 1,
  showHidden = false
): Promise<void> {
  try {
    const files: string[] = await readdirAsync(path);

    // On first pass, display the full path of specified relative path.
    if (indent === 1) {
      // TODO Change to if (indent === 1 && path.contains('.'))
      const savedDir = process.cwd();
      process.chdir(path);
      console.log(process.cwd());
      process.chdir(savedDir);
    }
    for (let i = 0; i < files.length; ++i) {
      // node_modules is a huge directory so I'm skipping it by default.
      if (files[i] === 'node_modules') continue; // TODO

      // A '.' at the beginning of a file/dir name usually denotes a hidden file.
      if (!showHidden && files[i].startsWith('.')) continue;

      // Use fs.Stats to determine whether it's a file or directory.
      const stats = await statAsync(path + '\\' + files[i]);
      if (stats.isFile()) {
        const lastFile: boolean = i === files.length - 1;
        logFile(indent, files[i], lastFile);
      } else if (stats.isDirectory()) {
        logDir(indent, files[i]);
        // Recurse to get files within directory.
        // TODO Add option for depth at which to stop listing nested files.
        await listFiles(path + '/' + files[i], indent + 1, showHidden);
      } else {
        assert(false, 'There was something weird in a directory.');
      }
    }
  } catch (err) {
    // Catches error with readdirAsync and statAsync.
    console.log('ERROR:\t', err);
  }
}

async function main(): Promise<void> {
  // Prompt for root dir.
  const dir = await new Promise<string>(resolve => {
    rl.question('Path from cwd to directory: ', resolve);
  });
  // Prompt for showing hidden files.
  const hidden = await new Promise<string>(resolve => {
    rl.question('Show hidden files? (Y/n) ', resolve);
  });
  rl.close();
  rl.removeAllListeners();

  // List all files recursively in the specified root dir.
  console.log();
  await listFiles(dir, 1, hidden.toUpperCase() === 'Y' ? true : false);
}

main();
