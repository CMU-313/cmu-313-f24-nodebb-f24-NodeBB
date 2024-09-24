"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const eventemitter3_1 = require("eventemitter3");
const utils_1 = require("./utils");
class Editor extends eventemitter3_1.EventEmitter {
    /**
     * Finalize the editor object.
     *
     * It is called when associated textcomplete object is destroyed.
     */
    destroy() {
        return this;
    }
    /**
     * It is called when a search result is selected by a user.
     */
    applySearchResult(_searchResult) {
        throw new Error("Not implemented.");
    }
    /**
     * The input cursor's absolute coordinates from the window's left
     * top corner.
     */
    getCursorOffset() {
        throw new Error("Not implemented.");
    }
    /**
     * Editor string value from head to the cursor.
     * Returns null if selection type is range not cursor.
     */
    getBeforeCursor() {
        throw new Error("Not implemented.");
    }
    /**
     * Emit a move event, which moves active dropdown element.
     * Child class must call this method at proper timing with proper parameter.
     *
     * @see {@link Textarea} for live example.
     */
    emitMoveEvent(code) {
        const moveEvent = (0, utils_1.createCustomEvent)("move", {
            cancelable: true,
            detail: {
                code: code,
            },
        });
        this.emit("move", moveEvent);
        return moveEvent;
    }
    /**
     * Emit a enter event, which selects current search result.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */
    emitEnterEvent() {
        const enterEvent = (0, utils_1.createCustomEvent)("enter", { cancelable: true });
        this.emit("enter", enterEvent);
        return enterEvent;
    }
    /**
     * Emit a change event, which triggers auto completion.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */
    emitChangeEvent() {
        const changeEvent = (0, utils_1.createCustomEvent)("change", {
            detail: {
                beforeCursor: this.getBeforeCursor(),
            },
        });
        this.emit("change", changeEvent);
        return changeEvent;
    }
    /**
     * Emit a esc event, which hides dropdown element.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */
    emitEscEvent() {
        const escEvent = (0, utils_1.createCustomEvent)("esc", { cancelable: true });
        this.emit("esc", escEvent);
        return escEvent;
    }
    /**
     * Helper method for parsing KeyboardEvent.
     *
     * @see {@link Textarea} for live example.
     */
    getCode(e) {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                return "ENTER";
            case 27: // esc
                return "ESC";
            case 38: // up
                return "UP";
            case 40: // down
                return "DOWN";
            case 78: // ctrl-n
                if (e.ctrlKey)
                    return "DOWN";
                break;
            case 80: // ctrl-p
                if (e.ctrlKey)
                    return "UP";
                break;
        }
        return "OTHER";
    }
}
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map