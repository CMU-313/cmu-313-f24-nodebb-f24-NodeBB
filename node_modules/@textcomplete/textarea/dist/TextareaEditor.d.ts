import { Editor, CursorOffset, SearchResult } from "@textcomplete/core";
export declare class TextareaEditor extends Editor {
    private readonly el;
    constructor(el: HTMLTextAreaElement);
    destroy(): this;
    /**
     * @implements {@link Editor#applySearchResult}
     */
    applySearchResult(searchResult: SearchResult): void;
    /**
     * @implements {@link Editor#getCursorOffset}
     */
    getCursorOffset(): CursorOffset;
    /**
     * @implements {@link Editor#getBeforeCursor}
     */
    getBeforeCursor(): string | null;
    private getAfterCursor;
    private getElScroll;
    /**
     * The input cursor's relative coordinates from the textarea's left
     * top corner.
     */
    private getCursorPosition;
    private onInput;
    private onKeydown;
    private startListening;
    private stopListening;
}
