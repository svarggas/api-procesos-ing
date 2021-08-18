module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2021
    },
    'rules': {
        'indent': [
            'warn', 
            4, 
            { 'SwitchCase': 1 }
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'warn',
            'never'
        ],
        'eqeqeq': [
            'warn'
        ],
        'no-multiple-empty-lines': [
            'warn', { 'max': 1 }
        ],
        'no-console': [
            'warn', 
            { allow: ['warn', 'error'] }
        ]
    }
}