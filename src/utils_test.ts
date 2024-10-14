import { assertEquals, assertRejects } from "jsr:@std/assert";
import { fromFileUrl } from "jsr:@std/path";
import { loadEnv } from "./utils.ts";

Deno.test({
  name: "Should load env file with valid path",
  fn: async () => {
    const testdataPath = fromFileUrl(
      new URL("./testdata/env.txt", import.meta.url),
    );
    await loadEnv(testdataPath);
    const secret = Deno.env.get("TOKEN_SECRET");

    assertEquals(secret, "secret!");
  },
});

Deno.test({
  name: "Should throw error when env file is not found",
  fn: () => {
    const testdataPath = fromFileUrl(
      new URL("./testdata/invalid_path.txt", import.meta.url),
    );
    assertRejects(
      () => loadEnv(testdataPath),
      Error,
      "Env file is not found",
    );
  },
});
