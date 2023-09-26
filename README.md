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

With TypeScript installed, I can now create the `tsconfig.json` file my TypeScript code into regular JavaScript using

```
tsc init
```

and

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

-   [Web Site Name]
-   [Web Site Name]

# Future Work

Things that I need to fix, improve, and add in the future.

-   Item 1
-   Item 2
-   Item 3
