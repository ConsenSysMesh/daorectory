const path = require('path');
const fs  = require('fs');

const rootDir = path.resolve(fs.realpathSync(process.cwd()));
console.log('rootDir', rootDir);

module.exports = {
    rootDir,
    testMatch: [
        `${rootDir}/**/__tests__/**/*.{js,ts,jsx}`,
        // `${rootDir}/**/?(*.)(spec|test).{js,ts,jsx}`,
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost:81',
};
