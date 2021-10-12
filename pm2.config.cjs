module.exports = {
    apps: [
        {
            name: 'daorectory-ui',
            script: 'yarn d-space:start-hosted',
            args: '',
            watch: false,
            env: {
                PUBLIC_URL: 'https://alpha.sobol.io/ethonline2021',
                REACT_APP_ENV_PREFIX: '/ethonline2021',
                REACT_APP_API_HOST: 'https://alpha.sobol.io/ethonline2021',
                NODE_ENV: 'development',
            },
        },
        {
            name: 'daorectory-api-build',
            script: 'yarn daemon:build-dev',
            args: '',
            watch: false,
        },
        {
            name: 'daorectory-api',
            script: 'yarn daemon:run',
            args: '',
            watch: false,
            env: {
                URI_PREFIX: '/ethonline2021',
                NODE_ENV: 'development',
            },
        },
    ],
};
