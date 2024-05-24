import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import html from 'rollup-plugin-html';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'fabPluginsLibrary',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.json', '.css']
    }),
    commonjs(),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      extract: true,
      minimize: true,
      extensions: ['.css']
    }),
    html({
      include: '**/*.html',
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    image(),
    svgr(),
    url({
      limit: 10 * 1024,
      include: ['**/*.svg'],
      emitFiles: true,
    }),
    json()
  ],
  external: ['react', 'react-dom'],
};
