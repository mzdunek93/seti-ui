"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = (el) => document.querySelector(el);
exports.queryAll = (el) => document.querySelectorAll(el);
exports.toggleClass = (action, el, className) => el.forEach((el) => el.classList[action](className));
exports.addClass = (el, className) => exports.toggleClass('add', el, className);
exports.removeClass = (el, className) => exports.toggleClass('remove', el, className);
//# sourceMappingURL=dom.js.map