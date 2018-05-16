(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueCkeditor = {})));
}(this, (function (exports) { 'use strict';

  var index = {
    name: 'split-pane',
    data: function data() {
      return {
        gutter: 11,
        split: 50,
        dragging: false
      };
    },
    computed: {
      splitLeft: function splitLeft() {
        return "calc(".concat(this.split, "% - ").concat(this.gutter, "px)");
      },
      splitRight: function splitRight() {
        return "calc(".concat(100 - this.split, "% - ").concat(this.gutter, "px)");
      }
    },
    render: function render(h) {
      return h('div', {
        class: {
          'split-pane': true,
          'is-dragging': this.dragging
        },
        on: {
          mousemove: this.dragMove,
          mouseup: this.dragEnd,
          mouseleave: this.dragEnd
        }
      }, [h('div', {
        class: 'split-pane-item',
        style: {
          width: this.splitLeft
        }
      }, this.$slots.left), h('div', {
        class: 'split-pane-gutter',
        on: {
          mousedown: this.dragStart
        }
      }), h('div', {
        class: 'split-pane-item',
        style: {
          width: this.splitRight
        }
      }, this.$slots.right)]);
    },
    methods: {
      dragStart: function dragStart(e) {
        this.dragging = true;
        this.startX = e.pageX;
        this.startSplit = this.split;
      },
      dragMove: function dragMove(e) {
        if (this.dragging) {
          var dx = e.pageX - this.startX;
          var totalWidth = this.$el.offsetWidth;
          this.split = this.startSplit + ~~(dx / totalWidth * 100);
        }
      },
      dragEnd: function dragEnd() {
        this.dragging = false;
      }
    }
  };

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
