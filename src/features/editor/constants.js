export const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "csharp",
  "cpp",
  "css",
  "html",
];

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {
  console.log("Hello, " + name);
}

greet("Umair");`,

  typescript: `function greet(name: string): void {
  console.log("Hello, " + name);
}

greet("Umair");`,

  python: `def greet(name):
    print("Hello, " + name)

greet("Umair")`,

  csharp: `using System;

class Program {
  static void Main(string[] args) {
    Console.WriteLine("Hello, Umair");
  }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, Umair" << endl;
  return 0;
}`,

  css: `body {
  background-color: #f4f4f4;
  font-family: sans-serif;
}

h1 {
  color: #333;
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hello Umair</title>
</head>
<body>
  <h1>Hello, Umair!</h1>
</body>
</html>`,
};
