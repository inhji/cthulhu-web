module.exports = {
  extends: 'standard',
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'max-len': ['error', { code: 100 }]
  },
  plugins: ['babel', 'react'],
  parser: 'babel-eslint'
}
