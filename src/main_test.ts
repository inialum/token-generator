import { assertEquals, assertRejects } from "jsr:@std/assert";
import { loadEnv } from "./main.ts";
import * as path from "jsr:@std/path";

Deno.test({
  name: "Should load env file with valid path",
  fn: async () => {
    await loadEnv(path.join(import.meta.dirname!, "./testdata/test_env.txt"));
    const secret = Deno.env.get("INIALUM_SERVICE_TOKEN_SECRET");

    assertEquals(secret, "This is a secret!");
  },
});

Deno.test({
  name: "Should throw error when env file is not found",
  fn: () => {
    assertRejects(
      () => loadEnv("./testdata/invalid_path.txt"),
      Error,
      "Env file is not found",
    );
  },
});
