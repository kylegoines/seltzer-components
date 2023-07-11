const c = /* @__PURE__ */ new Map(), l = [], C = (t) => {
  r(document).map((n, s) => {
    const a = n.getAttribute("data-component"), i = t[a];
    if (i) {
      const o = new i(n);
      o._acceptElem(n, a), o.init && o.init(), c.set(n, o);
    } else {
      h(a);
      return;
    }
  }), window.debugComponents = l;
}, r = (t) => [
  ...t.querySelectorAll("[data-component]")
], h = (t) => console.warn(
  `There is no reference to component file with class name "${t}" 
 Check if this class exists and in components/index.js. remember, components are case sensitive!`
);
class u {
  constructor() {
    this.events = {};
  }
  dispatch(e, n) {
    const s = this.events[e];
    s && s.fire(n);
  }
  on(e, n) {
    let s = this.events[e];
    s || (s = new p(e), this.events[e] = s), s.registerCallback(n);
  }
  off(e, n) {
    const s = this.events[e];
    s && s.callbacks.indexOf(n) > -1 && (s.unregisterCallback(n), s.callbacks.length === 0 && delete this.events[e]);
  }
}
class p {
  constructor(e) {
    this.eventName = e, this.callbacks = [];
  }
  registerCallback(e) {
    this.callbacks.push(e);
  }
  unregisterCallback(e) {
    const n = this.callbacks.indexOf(e);
    n > -1 && this.callbacks.splice(n, 1);
  }
  fire(e) {
    this.callbacks.slice(0).forEach((s) => {
      s(e);
    });
  }
}
function d(t) {
  return !isNaN(t) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  !isNaN(parseFloat(t));
}
function f(t) {
  return t.toLowerCase() === "true" || t.toLowerCase() === "false";
}
const m = (t) => f(t) ? t.toLowerCase() === "true" : d(t) ? parseFloat(t) : t;
class b extends u {
  constructor() {
    super(), this.name = null, this.elem = null, this.node = null, this.options = {}, this.abortController = new AbortController();
  }
  _acceptElem(e, n) {
    this.name = n, this.elem = e, this.node = e, this._setOptions();
  }
  _setOptions() {
    const e = new RegExp("^data-" + this.name + "-(.*)", "i");
    new Array(this.elem.attributes.length).fill(0).forEach((s, a) => {
      const i = this.elem.attributes[a], o = e.exec(i.nodeName);
      o != null && o.length >= 2 && (this.options[o[1]] && console.warn(
        `Duplicate value matched: ${o[1]} please do not duplicate options in component`
      ), this.options[o[1]] = m(i.value));
    });
  }
  // this is a safe way to remove all events on a destory method - not exactlyt what you might want for all cases
  // but useful for a full component breakdown if you manage your events here
  addEvent(e, n, s) {
    e.addEventListener(n, s, {
      signal: this.abortController.signal
    });
  }
  getChild(e) {
    return this.elem.querySelector(`[data-${this.name}-${e}]`);
  }
  getChildren(e) {
    return [
      ...this.elem.querySelectorAll(`[data-${this.name}-${e}]`)
    ];
  }
  destroyEvents() {
    this.abortController.abort();
  }
  dispatchDestroy() {
    this.dispatch("destroy");
  }
}
export {
  b as BaseComponent,
  C as default
};
