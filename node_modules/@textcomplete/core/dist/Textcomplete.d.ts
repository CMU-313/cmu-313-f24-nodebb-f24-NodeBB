import { EventEmitter } from "eventemitter3";
import { DropdownOption } from "./Dropdown";
import { Editor } from "./Editor";
import { StrategyProps } from "./Strategy";
export interface TextcompleteOption {
    dropdown?: DropdownOption;
}
export declare class Textcomplete extends EventEmitter {
    private readonly editor;
    private readonly completer;
    private readonly dropdown;
    private isQueryInFlight;
    private nextPendingQuery;
    constructor(editor: Editor, strategies: StrategyProps[], option?: TextcompleteOption);
    destroy(destroyEditor?: boolean): this;
    isShown(): boolean;
    hide(): this;
    trigger(beforeCursor: string): this;
    private handleHit;
    private handleMove;
    private handleEnter;
    private handleEsc;
    private handleChange;
    private handleSelect;
    private handleResize;
    private startListening;
    private stopListening;
}
