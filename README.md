# Vue Split Pane

> Adjustable split pane using Vue.js

![](screenshot.gif)

## Install

```
# yarn (recommend)
$ yarn add vue-split-pane

# npm
$ npm install vue-split-pane --save
```

## Usage

### CDN

```html
<script src="https://unpkg.com/vue-split-pane"></script>
```

### .vue files

```vue
<template>
  <div class="app">
    <VueSplitPane>
      <section slot="left">Left Pane</section>
      <section slot="right">Right Pane</section>
    </VueSplitPane>
  </div>
</template>

<script>
import VueSplitPane from 'vue-split-pane';

export default {
  components: { VueSplitPane },
};
</script>

<!-- optionally use our default style -->
<style>
@import 'vue-split-pane/dist/vue-split-pane.esm.css';
</style>
```

## Slot

| Name    | Description               |
| ------- | ------------------------- |
| `left`  | The content of left pane  |
| `right` | The content of right pane |

## Build Setup

You can use [vue-cli](https://github.com/vuejs/vue-cli) with [vue-rollup-boilerplate templates](https://github.com/dangvanthanh/vue-rollup-boilerplate) or [other vue templates](https://github.com/vuejs-templates)

## License

MIT © Dang Van Thanh <dangvanthanh@dangthanh.org>
