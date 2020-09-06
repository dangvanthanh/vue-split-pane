(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vue-split-pane'] = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'VueSplitPane',
    data() {
      return {
        gutter: 11,
        split: 50,
        dragging: false,
      };
    },
    computed: {
      splitLeft: function () {
        return `calc(${this.split}% - ${this.gutter}px)`;
      },
      splitRight: function () {
        return `calc(${100 - this.split}% - ${this.gutter}px)`;
      },
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
          this.split = this.startSplit + ~~((dx / totalWidth) * 100);
        }
      },
      dragEnd() {
        this.dragging = false;
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "split-pane",
        class: { "is-dragging": _vm.dragging },
        on: {
          mousemove: _vm.dragMove,
          mouseup: _vm.dragEnd,
          mouseleave: _vm.dragEnd
        }
      },
      [
        _c(
          "div",
          { staticClass: "split-pane-item", style: { width: _vm.splitLeft } },
          [_vm._t("left")],
          2
        ),
        _vm._v(" "),
        _c("div", {
          staticClass: "split-pane-gutter",
          on: { mousedown: _vm.dragStart }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "split-pane-item", style: { width: _vm.splitRight } },
          [_vm._t("right")],
          2
        )
      ]
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-1d65af2a_0", { source: "\n.split-pane[data-v-1d65af2a] {\n  display: flex;\n  flex-direction: row;\n  height: 80%;\n}\n.split-pane-item[data-v-1d65af2a],\n.split-pane-gutter[data-v-1d65af2a] {\n  height: 80%;\n}\n.split-pane-gutter[data-v-1d65af2a] {\n  background: #000;\n  opacity: 0.2;\n  z-index: 1;\n  box-sizing: border-box;\n  background-clip: padding-box;\n  width: 11px;\n  margin: 0 -5px;\n  border-left: 5px solid rgba(255, 255, 255, 0);\n  border-right: 5px solid rgba(255, 255, 255, 0);\n  cursor: col-resize;\n}\n.split-pane-gutter[data-v-1d65af2a]:hover,\n.split-pane-gutter[data-v-1d65af2a]:focus {\n  border-left: 5px solid rgba(0, 0, 0, 0.5);\n  border-right: 5px solid rgba(0, 0, 0, 0.5);\n  transition: all 2s ease;\n}\n.is-dragging[data-v-1d65af2a] {\n  cursor: col-resize;\n}\n", map: {"version":3,"sources":["/Users/dangvanthanh/Code/vue-split-pane/src/VueSplitPane.vue"],"names":[],"mappings":";AAyDA;EACA,aAAA;EACA,mBAAA;EACA,WAAA;AACA;AAEA;;EAEA,WAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,UAAA;EACA,sBAAA;EACA,4BAAA;EACA,WAAA;EACA,cAAA;EACA,6CAAA;EACA,8CAAA;EACA,kBAAA;AACA;AAEA;;EAEA,yCAAA;EACA,0CAAA;EACA,uBAAA;AACA;AAEA;EACA,kBAAA;AACA","file":"VueSplitPane.vue","sourcesContent":["<template>\n  <div\n    class=\"split-pane\"\n    :class=\"{ 'is-dragging': dragging }\"\n    @mousemove=\"dragMove\"\n    @mouseup=\"dragEnd\"\n    @mouseleave=\"dragEnd\"\n  >\n    <div class=\"split-pane-item\" :style=\"{ width: splitLeft }\">\n      <slot name=\"left\" />\n    </div>\n    <div class=\"split-pane-gutter\" @mousedown=\"dragStart\"></div>\n    <div class=\"split-pane-item\" :style=\"{ width: splitRight }\">\n      <slot name=\"right\" />\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'VueSplitPane',\n  data() {\n    return {\n      gutter: 11,\n      split: 50,\n      dragging: false,\n    };\n  },\n  computed: {\n    splitLeft: function () {\n      return `calc(${this.split}% - ${this.gutter}px)`;\n    },\n    splitRight: function () {\n      return `calc(${100 - this.split}% - ${this.gutter}px)`;\n    },\n  },\n  methods: {\n    dragStart(e) {\n      this.dragging = true;\n      this.startX = e.pageX;\n      this.startSplit = this.split;\n    },\n    dragMove(e) {\n      if (this.dragging) {\n        const dx = e.pageX - this.startX;\n        const totalWidth = this.$el.offsetWidth;\n        this.split = this.startSplit + ~~((dx / totalWidth) * 100);\n      }\n    },\n    dragEnd() {\n      this.dragging = false;\n    },\n  },\n};\n</script>\n\n<style scoped>\n.split-pane {\n  display: flex;\n  flex-direction: row;\n  height: 80%;\n}\n\n.split-pane-item,\n.split-pane-gutter {\n  height: 80%;\n}\n\n.split-pane-gutter {\n  background: #000;\n  opacity: 0.2;\n  z-index: 1;\n  box-sizing: border-box;\n  background-clip: padding-box;\n  width: 11px;\n  margin: 0 -5px;\n  border-left: 5px solid rgba(255, 255, 255, 0);\n  border-right: 5px solid rgba(255, 255, 255, 0);\n  cursor: col-resize;\n}\n\n.split-pane-gutter:hover,\n.split-pane-gutter:focus {\n  border-left: 5px solid rgba(0, 0, 0, 0.5);\n  border-right: 5px solid rgba(0, 0, 0, 0.5);\n  transition: all 2s ease;\n}\n\n.is-dragging {\n  cursor: col-resize;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-1d65af2a";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Declare install function excuted by Vue.use()
  function install(Vue) {
    if (install.installed) {
      return;
    }
    install.installed = true;
    Vue.component('VueSplitPane', __vue_component__);
  }

  const plugin = { install };

  let GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = plugin;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
