export default {
  name: 'split-pane',
  data() {
    return {
      gutter: 11,
      split: 50,
      dragging: false
    };
  },
  computed: {
    splitLeft: function() {
      return `calc(${this.split}% - ${this.gutter}px)`;
    },
    splitRight: function() {
      return `calc(${100 - this.split}% - ${this.gutter}px)`;
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: {
          'split-pane': true,
          'is-dragging': this.dragging
        },
        on: {
          mousemove: this.dragMove,
          mouseup: this.dragEnd,
          mouseleave: this.dragEnd
        }
      },
      [
        h(
          'div',
          {
            class: 'split-pane-item',
            style: { width: this.splitLeft }
          },
          this.$slots.left
        ),
        h('div', {
          class: 'split-pane-gutter',
          on: { mousedown: this.dragStart }
        }),
        h(
          'div',
          {
            class: 'split-pane-item',
            style: { width: this.splitRight }
          },
          this.$slots.right
        )
      ]
    );
  },
  methods: {
    dragStart(e) {
      this.dragging = true;
      this.startX = e.pageX;
      this.startSplit = this.split;
    },
    dragMove(e) {
      if (this.dragging) {
        const dx = e.pageX - this.startX;
        const totalWidth = this.$el.offsetWidth;
        this.split = this.startSplit + ~~(dx / totalWidth * 100);
      }
    },
    dragEnd() {
      this.dragging = false;
    }
  }
};
