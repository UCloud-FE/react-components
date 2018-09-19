module.exports = {
    rules: {
        'scope-empty': [2, 'never'],
        'scope-case': [2, 'always', ['lower-case', 'camel-case', 'pascal-case']],
        'footer-leading-blank': [0]
    },
    extends: ['@commitlint/config-conventional']
};
