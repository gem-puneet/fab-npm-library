// import html from 'rollup-plugin-html';
// import css from 'rollup-plugin-css-only';

// export default {
//     input: 'src/index.js',
//     output: {
//         file: 'dist/fab-plugins-library.js',
//         format: 'umd',
//         name: 'myPackage',
//     },
//     plugins: [
//         html({
//             include: '**/*.html',
//             htmlMinifierOptions: {
//                 collapseWhitespace: true,
//                 collapseBooleanAttributes: true,
//                 conservativeCollapse: true,
//                 minifyCSS: true,
//                 minifyJS: true,
//             },
//             dest: 'dist' // Specify output directory for HTML files
//         }),
//         css({
//             output: 'dist/fab-plugins-library.css' // Output CSS file
//         })
//     ],
// };


import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import html from 'rollup-plugin-html';
import image from '@rollup/plugin-image'; // For handling images
import svgr from '@svgr/rollup'; // For handling SVG icons
import url from 'rollup-plugin-url'; //For handle SVG images
 
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/fab-plugins-library.js',
    format: 'umd',
    name: 'myPackage',
  },
  plugins: [
    resolve(),
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
      include: '**/*.html', // Include HTML files
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    image(), // For handling images
    svgr(), // For handling SVG icons
    url({
      limit: 10 * 1024,
      include: ['**/*.svg'],
      emitFiles: true 
    })
  ],
  external: ['react'], // Specify external dependencies
};
