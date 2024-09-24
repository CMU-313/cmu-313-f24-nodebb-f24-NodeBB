"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateElementOffset = void 0;
/**
 * Get the current coordinates of the `el` relative to the document.
 */
const calculateElementOffset = (el) => {
    const rect = el.getBoundingClientRect();
    const owner = el.ownerDocument;
    if (owner == null) {
        throw new Error("Given element does not belong to document");
    }
    const { defaultView, documentElement } = owner;
    if (defaultView == null) {
        throw new Error("Given element does not belong to window");
    }
    const offset = {
        top: rect.top + defaultView.pageYOffset,
        left: rect.left + defaultView.pageXOffset,
    };
    if (documentElement) {
        offset.top -= documentElement.clientTop;
        offset.left -= documentElement.clientLeft;
    }
    return offset;
};
exports.calculateElementOffset = calculateElementOffset;
//# sourceMappingURL=calculateElementOffset.js.map