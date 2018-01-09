<template>
  <div class="app">
    <h1>Split Pane Using Vue.js</h1>
    <split-pane>
      <div slot="left">Left Pane</div>
      <div slot="right">Right Pane</div>
    </split-pane>
  </div>
</template>

<script>
import SplitPane from '@/components/SplitPane.vue'

export default {
  name: 'app',
  components: { SplitPane }
}
</script>

<style>
body {
  margin: 0;
}

.app {
  max-width: 768px;
  margin: 0 auto;
}

.app .split-pane {
  border: 1px solid rgba(0, 0, 0, .3);
  height: calc(100vh - 100px);
}
</style>
