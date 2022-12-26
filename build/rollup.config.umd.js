import terser from '@rollup/plugin-terser';
import vue from 'rollup-plugin-vue';
import base from './rollup.config.base';
import pkg from '../package.json';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-split-pane',
    file: pkg.main,
    format: 'umd',
  },
});

config.plugins.push(vue());
config.plugins.push(terser())

export default config;
