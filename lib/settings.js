"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const fs = __importStar(require("fs"));
const dom_1 = require("./dom");
const applySetting = ({ config, action, selectors, className }) => {
    const cb = (val) => action({ selectors, className, bool: val });
    cb(atom.config.get(config));
    atom.config.onDidChange(config, ({ oldValue, newValue }) => {
        if (oldValue !== newValue) {
            cb(newValue);
        }
    });
};
const wrapArr = (val) => (Array.isArray(val) ? val : [val]);
const getMethod = (bool) => (bool ? dom_1.addClass : dom_1.removeClass);
// ADD CLASS WHEN CONDITIONAL IS TRUE
const addWhenTrue = ({ selectors, bool, className }) => wrapArr(selectors).forEach((selector) => getMethod(bool)(dom_1.queryAll(selector), className));
// ADD CLASS WHEN CONDITIONAL IS FALSE
const addWhenFalse = (_a) => {
    var { bool } = _a, props = __rest(_a, ["bool"]);
    return addWhenTrue(Object.assign({ bool: !bool }, props));
};
const configs = [
    {
        config: 'seti-ui.hideProjectTab',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'hide-project-tab'
    },
    {
        config: 'seti-ui.compactView',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'seti-compact'
    },
    {
        config: 'seti-ui.hideTitleBar',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'hide-title-bar'
    },
    {
        config: 'seti-ui.hideDocumentTitle',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'hide-document-title'
    },
    {
        config: 'seti-ui.hideProjectTab',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'hide-project-tab'
    },
    {
        config: 'seti-ui.hideTabs',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'seti-hide-tabs'
    },
    {
        config: 'seti-ui.fileIcons',
        action: addWhenTrue,
        selectors: ['atom-workspace'],
        className: 'seti-icons'
    },
    {
        config: 'seti-ui.displayIgnored',
        action: addWhenFalse,
        selectors: [
            '.file.entry.list-item.status-ignored',
            '.directory.entry.list-nested-item.status-ignored'
        ],
        className: 'seti-hide'
    }
];
const pkg = atom.packages.getLoadedPackage('seti-ui');
const refresh = () => {
    var _a;
    (_a = pkg === null || pkg === void 0 ? void 0 : pkg.deactivate) === null || _a === void 0 ? void 0 : _a.call(pkg);
    setImmediate(() => { var _a; return (_a = pkg === null || pkg === void 0 ? void 0 : pkg.activate) === null || _a === void 0 ? void 0 : _a.call(pkg); });
};
// SET THEME COLOR
const setTheme = (theme, previous, reload) => __awaiter(void 0, void 0, void 0, function* () {
    const el = dom_1.query('atom-workspace');
    // GET OUR PACKAGE INFO
    const pkg = atom.packages.getLoadedPackage('seti-ui');
    // THEME DATA
    const themeData = ['', '-text', '-highlight']
        .map((suffix) => `@seti-primary${suffix}: @${theme.toLowerCase()}${suffix};`)
        .join(os_1.EOL);
    // SAVE TO ATOM CONFIG
    atom.config.set('seti-ui.themeColor', theme);
    // SAVE USER THEME FILE
    try {
        yield fs.promises.writeFile(`${pkg === null || pkg === void 0 ? void 0 : pkg.path}/styles/user-theme.less`, themeData);
        if (previous) {
            el === null || el === void 0 ? void 0 : el.classList.remove('seti-theme-' + previous.toLowerCase());
            el === null || el === void 0 ? void 0 : el.classList.add('seti-theme-' + theme.toLowerCase());
        }
        if (reload) {
            refresh();
        }
    }
    catch (e) { }
});
exports.init = () => {
    configs.forEach(applySetting);
    setTheme(atom.config.get('seti-ui.themeColor'));
    atom.config.onDidChange('seti-ui.themeColor', ({ newValue, oldValue }) => setTheme(newValue, oldValue, true));
};
//# sourceMappingURL=settings.js.map