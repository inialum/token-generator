import { assertEquals, assertRejects } from "jsr:@std/assert";
import { loadEnv } from "./utils.ts";
import * as path from "jsr:@std/path";

Deno.test({
  name: "Should load env file with valid path",
  fn: async () => {
    const testdataPath = path.fromFileUrl(
      new URL("./testdata/env.txt", import.meta.url),
    );
    await loadEnv(path.resolve(testdataPath));
    const secret = Deno.env.get("INIALUM_SERVICE_TOKEN_SECRET");

    assertEquals(secret, "secret!");
  },
});

Deno.test({
  name: "Should throw error when env file is not found",
  fn: () => {
    const testdataPath = path.fromFileUrl(
      new URL("./testdata/invalid_path.txt", import.meta.url),
    );
    assertRejects(
      () => loadEnv(testdataPath),
      Error,
      "Env file is not found",
    );
  },
});
