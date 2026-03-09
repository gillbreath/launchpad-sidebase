# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup
### NextAuth
Using a command line, run `openssl rand -base64 32`. This will generate a token.
In development, add it to the `.env` file with the variable name AUTH_SECRET=[your token]
In production, add it to the secrets manager. (Nuxt built code does not read .env files
