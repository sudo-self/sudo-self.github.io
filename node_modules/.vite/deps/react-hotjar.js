import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-hotjar/src/react-hotjar.js
var require_react_hotjar = __commonJS({
  "node_modules/react-hotjar/src/react-hotjar.js"(exports, module) {
    module.exports = function({ id, sv, debug = false, nonce = null }) {
      (function(h, o, t, j, a, r) {
        h.hj = h.hj || function() {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
        h._hjSettings = { hjid: id, hjsv: sv, hjDebug: debug };
        h._scriptPath = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        if (!document.querySelector(
          'script[src*="' + h._scriptPath + '"]'
        )) {
          a = o.getElementsByTagName("head")[0];
          r = o.createElement("script");
          if (nonce) r.setAttribute("nonce", nonce);
          r.async = 1;
          r.src = h._scriptPath;
          a.appendChild(r);
        }
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    };
  }
});

// node_modules/react-hotjar/index.js
var require_react_hotjar2 = __commonJS({
  "node_modules/react-hotjar/index.js"(exports, module) {
    var hotjarLib = require_react_hotjar();
    var hj = (...params) => {
      if (!window.hj) {
        throw new Error("Hotjar is not initialized");
      }
      window.hj(...params);
    };
    module.exports = {
      hotjar: {
        initialize: function initialize({ id, sv, debug, nonce }) {
          hotjarLib({ id, sv, debug, nonce });
        },
        initialized: function initialized() {
          return typeof window !== "undefined" && typeof (window == null ? void 0 : window.hj) === "function";
        },
        identify: function identify(userId, properties) {
          hj("identify", userId, properties);
        },
        event: function event(event) {
          hj("event", event);
        },
        stateChange: function stateChange(relativePath) {
          hj("stateChange", relativePath);
        }
      }
    };
  }
});
export default require_react_hotjar2();
//# sourceMappingURL=react-hotjar.js.map
