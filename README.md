# @inialum/token-generator

CLI tool to generate a token for INIALUM services.

[![npm version](https://img.shields.io/npm/v/%40inialum%2Ftoken-generator?style=flat&label=npm%20version&color=36B011&cacheSeconds=3600)](https://www.npmjs.com/package/@inialum/token-generator)

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

## License

Licensed under [Apache License 2.0](LICENSE).
