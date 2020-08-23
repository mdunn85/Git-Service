module.exports = {
    preset: 'ts-jest',
    roots: [
        '<rootDir>/src/'
    ],
    collectCoverageFrom: [
        'src/**',
        '!**/*.spec.ts',
        '!src/main.ts',
        '!src/**/*.module.ts'
    ],
    testEnvironment: 'node',
    verbose: true,
    reporters: ['default'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1'
    },
    coverageDirectory: 'test-results'
}
