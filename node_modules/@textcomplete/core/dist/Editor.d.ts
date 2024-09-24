import { EventEmitter } from "eventemitter3";
import { SearchResult } from "./SearchResult";
export interface CursorOffset {
    lineHeight: number;
    top: number;
    left?: number;
    right?: number;
    clientTop?: number;
}
type KeyCode = "ESC" | "ENTER" | "UP" | "DOWN" | "OTHER";
export declare abstract class Editor extends EventEmitter {
    /**
     * Finalize the editor object.
     *
     * It is called when associated textcomplete object is destroyed.
     */
    destroy(): this;
    /**
     * It is called when a search result is selected by a user.
     */
    applySearchResult(_searchResult: SearchResult<unknown>): void;
    /**
     * The input cursor's absolute coordinates from the window's left
     * top corner.
     */
    getCursorOffset(): CursorOffset;
    /**
     * Editor string value from head to the cursor.
     * Returns null if selection type is range not cursor.
     */
    getBeforeCursor(): string | null;
    /**
     * Emit a move event, which moves active dropdown element.
     * Child class must call this method at proper timing with proper parameter.
     *
     * @see {@link Textarea} for live example.
     */
    emitMoveEvent(code: "UP" | "DOWN"): CustomEvent;
    /**
     * Emit a enter event, which selects current search result.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */
    emitEnterEvent(): CustomEvent;
    /**
     * Emit a change event, which triggers auto completion.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */
    emitChangeEvent(): CustomEvent;
    /**
     * Emit a esc event, which hides dropdown element.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */
    emitEscEvent(): CustomEvent;
    /**
     * Helper method for parsing KeyboardEvent.
     *
     * @see {@link Textarea} for live example.
     */
    protected getCode(e: KeyboardEvent): KeyCode;
}
export {};
