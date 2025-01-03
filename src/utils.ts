import dotenvx from "@dotenvx/dotenvx";
import * as jose from "jose";

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

export async function loadEnv(path: string) {
  const isEnvFileExists = await fileExists(path);
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
