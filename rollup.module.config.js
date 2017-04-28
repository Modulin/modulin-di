import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/di.js',
  dest: 'dist/modulin-di.module.js',
  format: 'es',

  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: 'es2015-rollup'
    })
  ]
}