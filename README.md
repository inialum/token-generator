# @inialum/token-generator

CLI tool to generate a token for INIALUM services.

<!-- markdownlint-disable no-inline-html -->
<div style="display: flex; column-gap: 10px;">
   <a href="https://www.npmjs.com/package/@inialum/token-generator">
      <img src="https://img.shields.io/npm/v/%40inialum%2Ftoken-generator?style=flat&label=npm%20version&color=36B011&cacheSeconds=3600" alt="" />
   </a>
   <a href="https://jsr.io/@inialum/token-generator">
      <img src="https://jsr.io/badges/@inialum/token-generator" alt="" />
   </a>
</div>

## Usage

1. Install the package:

   ```bash
   pnpm add -D @inialum/token-generator
   ```

   Or if you prefer to run it directly without installing it:

   ```bash
   pnpm dlx @inialum/token-generator -- <options>
   ```

2. Create a `.env` file in the root of your project:

   ```env
   TOKEN_SECRET=<secret>
   ```

   You can create random secret value for `TOKEN_SECRET` with the following command:

   ```shell
   openssl rand -base64 32
   ```

3. Add the following script to your `package.json`:

   ```json
   {
     "scripts": {
       "generate-token": "inialum-token-generator --service-name <service_name> --env-file <path_to_env_file>"
     }
   }
   ```

   `--service-name` is required. It is the name of the service that will use the token.  
   `--env-file` is optional. If not provided, the tool will look for a `.env` file in the root of your project.

4. Run the script in your project:

   ```bash
   pnpm run generate-token
   ```

### Tips

You can also install from JSR and run it on Deno:

   ```bash
   deno install -g --allow-read --allow-env --allow-run -n inialum-token-generator jsr:@inialum/token-generator
   inialum-token-generator -- <options>
   ```

## Release

Use the following release flow:

1. Create a tag on `main` (example: `vX.Y.Z`).
2. Push only the tag: `git push origin vX.Y.Z`.
3. Wait for GitHub Actions `Release` workflow to publish to npm/JSR and create a draft release note.
4. Edit the draft release description on GitHub.
5. Publish the release.

## License

Licensed under [Apache License 2.0](LICENSE).
