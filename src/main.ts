import { parseArgs } from "jsr:@std/cli/parse-args";
import { fromFileUrl, toFileUrl } from "jsr:@std/path";

import { TOKEN_SECRET_NAME } from "./constants.ts";
import { generateToken, loadEnv } from "./utils.ts";

const DEFAULT_ENV_FILE = ".env";

try {
  const args = parseArgs(Deno.args);

  const currentDir = Deno.cwd();
  const envFilePath = fromFileUrl(
    new URL(args["env-file"] || DEFAULT_ENV_FILE, toFileUrl(`${currentDir}/`)),
  );
  if (typeof envFilePath !== "undefined" && typeof envFilePath !== "string") {
    throw new Error("env-file is invalid");
  }

  await loadEnv(envFilePath);

  const secret = Deno.env.get(TOKEN_SECRET_NAME);
  if (!secret) {
    throw new Error(`${TOKEN_SECRET_NAME} is not set in env file`);
  }

  const serviceName = args["service-name"];
  if (typeof serviceName === "undefined") {
    throw new Error("service-name is required");
  }
  if (typeof serviceName !== "string") {
    throw new Error("service-name is invalid");
  }

  const token = await generateToken(secret, {
    service_name: serviceName,
  });
  console.info(`token: ${token}`);
} catch (e) {
  if (e instanceof Error) {
    console.error("Failed to create token:", e.message);
  } else {
    console.error(e);
  }
  Deno.exit(1);
}
