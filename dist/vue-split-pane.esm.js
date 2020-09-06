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
      _vm._ssrNode(
        '<div class="split-pane-item"' +
          _vm._ssrStyle(null, { width: _vm.splitLeft }, null) +
          " data-v-1d65af2a>",
        "</div>",
        [_vm._t("left")],
        2
      ),
      _vm._ssrNode(' <div class="split-pane-gutter" data-v-1d65af2a></div> '),
      _vm._ssrNode(
        '<div class="split-pane-item"' +
          _vm._ssrStyle(null, { width: _vm.splitRight }, null) +
          " data-v-1d65af2a>",
        "</div>",
        [_vm._t("right")],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-1d65af2a";
  /* module identifier */
  const __vue_module_identifier__ = "data-v-1d65af2a";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
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

export default plugin;
export { install };
