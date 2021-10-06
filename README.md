Join D-Space.
Resistance is futile.
Bow down to our Daemon overlord.

To get started:
- (if you don't have node 16) `nvm install 16.9.1`
- `yarn`
- `yarn get-secrets` (uses your aws creds to pull a few common secrets down from S3)
- edit `packages/daemon/.env` and add your own Discord Application ID as `DISCORD_CLIENT_ID` and your own Bot's secret token as `DISCORD_API_TOKEN`
- run `yarn daemon:build-dev` in one terminal to rebuild code on file changes
- run `yarn daemon:run` to run daemon process
- Daemon API is running on port `8081` by default