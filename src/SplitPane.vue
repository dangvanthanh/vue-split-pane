<template>
  <div class="split-pane" @mousemove="dragMove" @mouseup="dragEnd" @mouseleave="dragEnd" :class="{ 'is-dragging': dragging }">
    <div class="split-pane-item" :style="{ width: splitLeft }">
      <slot name="left"></slot>
    </div>
    <div class="split-pane-gutter" @mousedown="dragStart" :style="{ width: gutter + 'px' }"></div>
    <div class="split-pane-item" :style="{ width: splitRight }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gutter: 5,
      split: 50,
      dragging: false
    }
  },
  computed: {
    splitLeft: function () {
      return `calc(${this.split}% - ${this.gutter}px)`
    },
    splitRight: function () {
      return `calc(${100 - this.split}% - ${this.gutter}px)`
    }
  },
  methods: {
    dragStart (e) {
      this.dragging = true
      this.startX = e.pageX
      this.startSplit = this.split
    },
    dragMove (e) {
      if (this.dragging) {
        const dx = e.pageX - this.startX
        const totalWidth = this.$el.offsetWidth
        this.split = this.startSplit + ~~(dx / totalWidth * 100)
      }
    },
    dragEnd () {
      this.dragging = false
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.split-pane {
  height: 100%;
}

.split-pane-item,
.split-pane-gutter {
  float: left;
  height: 100%;
}

.split-pane-gutter {
  background: #eee;
  cursor: ew-resize;
}

.is-dragging {
  cursor: ew-resize;
}
</style>
