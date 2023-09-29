# Overview

My goal is to learn and experiment with a bunch of different softwares so that I have a much better chance of landing a job.

With this program, you can provide a path to a directory on your machine and the program will read all the files and directories within and display them nicely to the console.

My purpose for writing this software is to learn the basics of TypeScript and to get a general feeling for working in a TypeScript development environment.

{Link to YouTube demonstration. 4-5 minute demo of the software running and a walkthrough of the code. Focus should be on sharing what I learned about the language syntax.}

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

I used Node.js and the npm package manager to download the TypeScript package globally using

```
npm install -g typescript
```

I installed it globally because I don't like using `npx` to run the `tsc` module.

With TypeScript installed, I can now create the `tsconfig.json` file for my project using

```
tsc init
```

then use

```
tsc
```

anytime I need to compile my TypeScript code into regular JavaScript code.

---

I further wanted to make sure I was using good syntax, so I am using the Google TypeScript linter ESLint. To download that I used `npm` again:

```
npm install -g gts
```

With linting in my development environment now, I can run

```
gts fix
```

to automatically fix all of my syntax and convention errors, as well as give me warnings about undesirable coding practices.

---

Finally, I can run the compiled JavaScript file by using `node`:

```
node ./build/src/index.js
```

# Useful Websites

- [TypeScript Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Google TypeScript Style (gts)](https://github.com/google/gts/blob/main/README.md)

# Future Work

Things that I need to fix, improve, and add in the future.

- Make it so that if a directory is the last item in its root, have the vertical line at its last deepest file depth turn into bent line.

  For example:

  ```
  ...

  │ ├─build/
  │ │ ├─src/
  │ │ │ ├─index.d.ts
  │ │ │ ├─index.js
  │ │ │ └─index.js.map
  │ ├─LICENSE/
  ...
  ```

  Would look like this:

  ```
  ...

  │ ├─build/
  │ │ ├─src/
  │ │ │ ├─index.d.ts
  │ │ │ ├─index.js
  │ │ └─└─index.js.map
  │ ├─LICENSE
  ...
  ```

- Make vertical lines at different indent levels different colors for better readability.
- Add an option for depth to stop listing files within subsequent directories.
- Make program work by running it with options from the command line.
