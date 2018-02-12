(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueSplitPane = factory());
}(this, (function () { 'use strict';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" *, *::before, *::after { box-sizing: border-box; } .split-pane { display: flex; flex-direction: row; height: 100%; } .split-pane-item, .split-pane-gutter { height: 100%; } .split-pane-gutter { background: #000; opacity: .2; z-index: 1; box-sizing: border-box; background-clip: padding-box; width: 11px; margin: 0 -5px; border-left: 5px solid rgba(255, 255, 255, 0); border-right: 5px solid rgba(255, 255, 255, 0); cursor: col-resize; } .split-pane-gutter:hover, .split-pane-gutter:focus { border-left: 5px solid rgba(0, 0, 0, 0.5); border-right: 5px solid rgba(0, 0, 0, 0.5); transition: all 2s ease; } .is-dragging { cursor: col-resize; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();












var SplitPane = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"split-pane",class:{ 'is-dragging': _vm.dragging },on:{"mousemove":_vm.dragMove,"mouseup":_vm.dragEnd,"mouseleave":_vm.dragEnd}},[_c('div',{staticClass:"split-pane-item",style:({ width: _vm.splitLeft })},[_vm._t("left")],2),_vm._v(" "),_c('div',{staticClass:"split-pane-gutter",on:{"mousedown":_vm.dragStart}}),_vm._v(" "),_c('div',{staticClass:"split-pane-item",style:({ width: _vm.splitRight })},[_vm._t("right")],2)])},staticRenderFns: [],
  data: function data () {
    return {
      gutter: 11,
      split: 50,
      dragging: false
    }
  },
  computed: {
    splitLeft: function () {
      return ("calc(" + (this.split) + "% - " + (this.gutter) + "px)")
    },
    splitRight: function () {
      return ("calc(" + (100 - this.split) + "% - " + (this.gutter) + "px)")
    }
  },
  methods: {
    dragStart: function dragStart (e) {
      this.dragging = true;
      this.startX = e.pageX;
      this.startSplit = this.split;
    },
    dragMove: function dragMove (e) {
      if (this.dragging) {
        var dx = e.pageX - this.startX;
        var totalWidth = this.$el.offsetWidth;
        this.split = this.startSplit + ~~(dx / totalWidth * 100);
      }
    },
    dragEnd: function dragEnd () {
      this.dragging = false;
    }
  }
}

return SplitPane;

})));
//# sourceMappingURL=vue-split-pane.js.map
