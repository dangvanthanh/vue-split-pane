import terser from '@rollup/plugin-terser';
import vue from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import base from './rollup.config.base';
import pkg from '../package.json';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'VueSplitPane',
    file: pkg.unpkg,
    format: 'iife'
  }
});

config.plugins.push(vue());
config.plugins.push(esbuild({ minify: true }));
config.plugins.push(terser())

export default config;
