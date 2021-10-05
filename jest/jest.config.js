// import paths from '@sobol/service/config/paths';

const path = require('path');
const fs  = require('fs');
// const { fileURLToPath } = require('url');

const rootDir = path.resolve(fs.realpathSync(process.cwd()));
console.log('rootDir', rootDir);
// const rootDir = path.resolve(localDir);
// console.log('rootDir', rootDir);

module.exports = {
    rootDir,
    // collectCoverageFrom: [
    //     `${paths.local}/**/*.{js,jsx}`,
    // ],
    // coveragePathIgnorePatterns: [
    //     '[/\\\\]build[/\\\\]',
    // ],
    // coverageDirectory: `${paths.local}/coverage`,
    // resolver: 'jest-pnp-resolver',
    testMatch: [
        `${rootDir}/**/__tests__/**/*.{js,ts,jsx}`,
        // `${rootDir}/**/?(*.)(spec|test).{js,ts,jsx}`,
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost:81',
    // transform: {},
    // transformIgnorePatterns: [
    //     '[/\\\\]node_modules[/\\\\]',
    // ],
    // moduleFileExtensions: [
    //     'web.js',
    //     'js',
    //     'json',
    //     'web.jsx',
    //     'jsx',
    //     'node',
    //     'ts'
    // ],
    // globalSetup: '<rootDir>/base/service/config/jest-setup',
    // globalTeardown: '<rootDir>/base/service/config/jest-teardown',
    // setupFilesAfterEnv: [
    //     'jest-extended',
    // ],
};
