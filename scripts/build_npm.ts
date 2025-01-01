import { build, emptyDir } from "@deno/dnt";
import { copy } from "@std/fs";

await emptyDir("./npm");
await Deno.remove("npm", { recursive: true }).catch((_) => {});
await copy("src/testdata", "npm/esm/testdata", { overwrite: true });

await build({
  entryPoints: [
    {
      kind: "bin",
      name: "inialum-token-generator",
      path: "./src/main.ts",
    },
  ],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  importMap: "deno.json",
  scriptModule: false,
  typeCheck: false,
  compilerOptions: {
    lib: ["ES2022"],
  },
  packageManager: "pnpm",
  package: {
    // package.json properties
    name: "@inialum/token-generator",
    version: Deno.args[0],
    description: "CLI tool to generate token",
    license: "Apache-2.0",
    main: "esm/main.js",
    publishConfig: {
      access: "public",
    },
    author: {
      name: "INIALUM - INIAD Alumni Meetings",
      email: "contact@inialum.org",
      url: "https://inialum.org",
    },
    repository: {
      type: "git",
      url: "https://github.com/inialum/token-generator",
    },
    bugs: {
      url: "https://github.com/inialum/token-generator/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});

await Deno.writeTextFile(
  "npm/.npmignore",
  "esm/testdata/",
  { append: true },
);
