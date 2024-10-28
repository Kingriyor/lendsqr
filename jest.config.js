// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     // setupFilesAfterEnv: ['./src/setupTests.ts'],
// };

// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files
    },
    // setupFilesAfterEnv: ['./src/setupTests.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and build folders
};