import Vue from 'vue';
import App from './App.vue';
import styles from '../themes/default.css';

const app = new Vue({
  el: '#app',
  render: h => h(App)
});
