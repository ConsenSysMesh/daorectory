module.exports = {
    apps: [
        {
            name: 'daorectory-ui',
            script: 'yarn d-space:start',
            args: '',
            watch: false,
            // env: {
            //     PUBLIC_URL: process.env.PUBLIC_URL,
            //     NODE_ENV: 'development',
            // },
            // env_production: {
            //     NODE_ENV: 'production',
            // },
        },
        {
            name: 'daorectory-api-build',
            script: 'yarn daemon:build-dev',
            args: '',
            watch: false,
            // env: {
            //     PUBLIC_URL: process.env.PUBLIC_URL,
            //     NODE_ENV: 'development',
            // },
            // env_production: {
            //     NODE_ENV: 'production',
            // },
        },
        {
            name: 'daorectory-api',
            script: 'yarn daemon:run',
            args: '',
            watch: false,
            // env: {
            //     PUBLIC_URL: process.env.PUBLIC_URL,
            //     NODE_ENV: 'development',
            // },
            // env_production: {
            //     NODE_ENV: 'production',
            // },
        },
    ],
};
