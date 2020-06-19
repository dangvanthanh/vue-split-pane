!(function (t, i) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = i())
    : 'function' == typeof define && define.amd
    ? define(i)
    : ((t = t || self).VueSplitPane = i());
})(this, function () {
  'use strict';
  return {
    name: 'vue-split-pane',
    data: function () {
      return { gutter: 11, split: 50, dragging: !1 };
    },
    computed: {
      splitLeft: function () {
        return 'calc('.concat(this.split, '% - ').concat(this.gutter, 'px)');
      },
      splitRight: function () {
        return 'calc('
          .concat(100 - this.split, '% - ')
          .concat(this.gutter, 'px)');
      },
    },
    render: function (t) {
      return t(
        'div',
        {
          class: { 'split-pane': !0, 'is-dragging': this.dragging },
          on: {
            mousemove: this.dragMove,
            mouseup: this.dragEnd,
            mouseleave: this.dragEnd,
          },
        },
        [
          t(
            'div',
            { class: 'split-pane-item', style: { width: this.splitLeft } },
            this.$slots.left
          ),
          t('div', {
            class: 'split-pane-gutter',
            on: { mousedown: this.dragStart },
          }),
          t(
            'div',
            { class: 'split-pane-item', style: { width: this.splitRight } },
            this.$slots.right
          ),
        ]
      );
    },
    methods: {
      dragStart: function (t) {
        (this.dragging = !0),
          (this.startX = t.pageX),
          (this.startSplit = this.split);
      },
      dragMove: function (t) {
        if (this.dragging) {
          var i = t.pageX - this.startX,
            s = this.$el.offsetWidth;
          this.split = this.startSplit + ~~((i / s) * 100);
        }
      },
      dragEnd: function () {
        this.dragging = !1;
      },
    },
  };
});
