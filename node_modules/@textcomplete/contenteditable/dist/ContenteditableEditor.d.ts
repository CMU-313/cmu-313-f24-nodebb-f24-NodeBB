import { Editor, CursorOffset, SearchResult } from "@textcomplete/core";
export declare class ContenteditableEditor extends Editor {
    readonly el: HTMLElement;
    constructor(el: HTMLElement);
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
    private getRange;
    private onInput;
    private onKeydown;
    private startListening;
    private stopListening;
}
