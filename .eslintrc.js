module.exports = {
  root: true,
  env : {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  globals: {
    $    : true,
    _    : true,
    utils: true,
    opts : true,
    vue  : true,
    M    : true
  },
  rules: {
    // allow paren-less arrow functions
    'arrow-parens'               : 0,
    // allow async-await
    'generator-star-spacing'     : 'off',
    'key-spacing'                : [1, { align: 'colon' }],
    camelcase                    : [1, { properties: 'always' }],
    'vue/max-attributes-per-line': [1, {
      singleline: 3,
      multiline : {
        max           : 1,
        allowFirstLine: true
      }
    }],
    'vue/attribute-hyphenation'       : [0],
    'vue/name-property-casing'        : [0],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline : 'never'
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
