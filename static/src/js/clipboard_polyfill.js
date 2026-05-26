/** @odoo-module */
import { browser } from "@web/core/browser/browser";

// navigator.clipboard requires HTTPS (secure context). On plain HTTP the API
// is undefined, causing Odoo's onClickClipboard to throw a TypeError.
// This polyfill patches browser.navigator.clipboard using the legacy
// document.execCommand('copy') as a fallback.
if (!browser.navigator.clipboard) {
    const clipboardPolyfill = {
        writeText(text) {
            return new Promise((resolve, reject) => {
                const el = document.createElement("textarea");
                el.value = text;
                el.style.cssText =
                    "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;";
                document.body.appendChild(el);
                el.focus();
                el.select();
                try {
                    if (document.execCommand("copy")) {
                        resolve();
                    } else {
                        reject(new Error("execCommand copy failed"));
                    }
                } catch (err) {
                    reject(err);
                } finally {
                    document.body.removeChild(el);
                }
            });
        },
        readText: () => Promise.resolve(""),
    };

    try {
        Object.defineProperty(browser.navigator, "clipboard", {
            value: clipboardPolyfill,
            configurable: true,
            writable: true,
        });
    } catch (_) {
        // navigator properties are non-configurable in some browsers;
        // shadow the entire navigator on the browser object via Proxy instead.
        Object.defineProperty(browser, "navigator", {
            value: new Proxy(browser.navigator, {
                get(target, key) {
                    if (key === "clipboard") return clipboardPolyfill;
                    const val = target[key];
                    return typeof val === "function" ? val.bind(target) : val;
                },
            }),
            configurable: true,
            writable: true,
        });
    }
}
