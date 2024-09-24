"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textcomplete = void 0;
const eventemitter3_1 = require("eventemitter3");
const Dropdown_1 = require("./Dropdown");
const Completer_1 = require("./Completer");
const PASSTHOUGH_EVENT_NAMES = [
    "show",
    "shown",
    "render",
    "rendered",
    "selected",
    "hidden",
    "hide",
];
class Textcomplete extends eventemitter3_1.EventEmitter {
    constructor(editor, strategies, option) {
        super();
        this.editor = editor;
        this.isQueryInFlight = false;
        this.nextPendingQuery = null;
        this.handleHit = ({ searchResults, }) => {
            if (searchResults.length) {
                this.dropdown.render(searchResults, this.editor.getCursorOffset());
            }
            else {
                this.dropdown.hide();
            }
            this.isQueryInFlight = false;
            if (this.nextPendingQuery !== null)
                this.trigger(this.nextPendingQuery);
        };
        this.handleMove = (e) => {
            e.detail.code === "UP" ? this.dropdown.up(e) : this.dropdown.down(e);
        };
        this.handleEnter = (e) => {
            const activeItem = this.dropdown.getActiveItem();
            if (activeItem) {
                this.dropdown.select(activeItem);
                e.preventDefault();
            }
            else {
                this.dropdown.hide();
            }
        };
        this.handleEsc = (e) => {
            if (this.dropdown.isShown()) {
                this.dropdown.hide();
                e.preventDefault();
            }
        };
        this.handleChange = (e) => {
            if (e.detail.beforeCursor != null) {
                this.trigger(e.detail.beforeCursor);
            }
            else {
                this.dropdown.hide();
            }
        };
        this.handleSelect = (selectEvent) => {
            this.emit("select", selectEvent);
            if (!selectEvent.defaultPrevented) {
                this.editor.applySearchResult(selectEvent.detail.searchResult);
            }
        };
        this.handleResize = () => {
            if (this.dropdown.isShown()) {
                this.dropdown.setOffset(this.editor.getCursorOffset());
            }
        };
        this.completer = new Completer_1.Completer(strategies);
        this.dropdown = Dropdown_1.Dropdown.create((option === null || option === void 0 ? void 0 : option.dropdown) || {});
        this.startListening();
    }
    destroy(destroyEditor = true) {
        this.completer.destroy();
        this.dropdown.destroy();
        if (destroyEditor)
            this.editor.destroy();
        this.stopListening();
        return this;
    }
    isShown() {
        return this.dropdown.isShown();
    }
    hide() {
        this.dropdown.hide();
        return this;
    }
    trigger(beforeCursor) {
        if (this.isQueryInFlight) {
            this.nextPendingQuery = beforeCursor;
        }
        else {
            this.isQueryInFlight = true;
            this.nextPendingQuery = null;
            this.completer.run(beforeCursor);
        }
        return this;
    }
    startListening() {
        var _a;
        this.editor
            .on("move", this.handleMove)
            .on("enter", this.handleEnter)
            .on("esc", this.handleEsc)
            .on("change", this.handleChange);
        this.dropdown.on("select", this.handleSelect);
        for (const eventName of PASSTHOUGH_EVENT_NAMES) {
            this.dropdown.on(eventName, (e) => this.emit(eventName, e));
        }
        this.completer.on("hit", this.handleHit);
        (_a = this.dropdown.el.ownerDocument.defaultView) === null || _a === void 0 ? void 0 : _a.addEventListener("resize", this.handleResize);
    }
    stopListening() {
        var _a;
        (_a = this.dropdown.el.ownerDocument.defaultView) === null || _a === void 0 ? void 0 : _a.removeEventListener("resize", this.handleResize);
        this.completer.removeAllListeners();
        this.dropdown.removeAllListeners();
        this.editor
            .removeListener("move", this.handleMove)
            .removeListener("enter", this.handleEnter)
            .removeListener("esc", this.handleEsc)
            .removeListener("change", this.handleChange);
    }
}
exports.Textcomplete = Textcomplete;
//# sourceMappingURL=Textcomplete.js.map