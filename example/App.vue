<template>
  <div id="app" class="app">
    <h1>Split Pane Using Vue.js</h1>
    <split-pane>
      <section slot="left">Left Pane</section>
      <section slot="right">Right Pane</section>
    </split-pane>
  </div>
</template>

<script>
import SplitPane from '../src';

export default {
  components: { SplitPane }
}
</script>

<style>
body {
  margin: 0;
}

.app {
  width: 60em;
  margin: 0 auto;
  height: 100vh;
}
</style>
