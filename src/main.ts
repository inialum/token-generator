import dotenvx from "npm:@dotenvx/dotenvx";
import { parseArgs } from "@std/cli/parse-args";
import * as jose from "https://deno.land/x/jose@v5.9.4/index.ts";
import { TOKEN_SECRET_NAME } from "./constants.ts";

type TokenPayload = {
  service_name: string;
};

async function fileExists(path: string) {
  try {
    const file = await Deno.stat(path);
    return file.isFile;
  } catch (_e) {
    return false;
  }
}

export async function loadEnv(path?: string) {
  const DEFAULT_ENV_FILE = ".env";

  const isEnvFileExists = await fileExists(path || DEFAULT_ENV_FILE);
  if (!isEnvFileExists) {
    throw new Error("Env file is not found");
  }

  dotenvx.config({
    path,
  });
}

export async function generateToken(secret: string, payload?: TokenPayload) {
  const encodedSecret = new TextEncoder().encode(secret);
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(encodedSecret);

  return jwt;
}

if (import.meta.main) {
  try {
    const args = parseArgs(Deno.args);

    const envFilePath = args["env-file"];
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
}
