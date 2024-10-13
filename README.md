# @inialum/token-generator

CLI tool to generate a token for INIALUM services.

## Usage

1. Install the package:

   ```bash
   pnpm add -D @inialum/token-generator
   ```

2. Create a `.env` file in the root of your project:

   ```env
   INIALUM_SERVICE_TOKEN_SECRET=<secret>
   ```

   You can create random secret value for `INIALUM_SERVICE_TOKEN_SECRET` with the following command:

   ```shell
   openssl rand -base64 32
   ```

3. Add the following script to your `package.json`:

   ```json
   {
     "scripts": {
       "generate-token": "inialum-token-generator --service <service_name> --env-file <path_to_env_file>"
     }
   }
   ```

   `--service` is required. It is the name of the service that will use the token.  
   `--env-file` is optional. If not provided, the tool will look for a `.env` file in the root of your project.

4. Run the script:

   ```bash
   pnpm run generate-token
   ```

## License

Licensed under [Apache License 2.0](LICENSE).
