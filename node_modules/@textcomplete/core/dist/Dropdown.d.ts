import { EventEmitter } from "eventemitter3";
import { SearchResult } from "./SearchResult";
import { CursorOffset } from "./Editor";
export interface DropdownOption {
    className?: string;
    item?: DropdownItemOption;
    footer?: ((results: unknown[]) => string) | string;
    header?: ((results: unknown[]) => string) | string;
    maxCount?: number;
    placement?: "auto" | "top" | "bottom";
    rotate?: boolean;
    style?: CSSStyleDeclaration;
    parent?: HTMLElement;
    dynamicWidth?: boolean;
}
interface DropdownItemOption {
    className?: string;
    activeClassName?: string;
}
export declare const DEFAULT_DROPDOWN_MAX_COUNT = 10;
export declare const DEFAULT_DROPDOWN_PLACEMENT = "auto";
export declare const DEFAULT_DROPDOWN_CLASS_NAME = "dropdown-menu textcomplete-dropdown";
export declare const DEFAULT_DROPDOWN_ITEM_CLASS_NAME = "textcomplete-item";
export declare const DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME = "textcomplete-item active";
export declare class Dropdown extends EventEmitter {
    readonly el: HTMLUListElement;
    private option;
    private shown;
    private items;
    private activeIndex;
    static create(option: DropdownOption): Dropdown;
    private constructor();
    /**
     * Render the given search results. Previous results are cleared.
     *
     * @emits render
     * @emits rendered
     */
    render(searchResults: SearchResult<unknown>[], cursorOffset: CursorOffset): this;
    destroy(): this;
    /**
     * Select the given item
     *
     * @emits select
     * @emits selected
     */
    select(item: DropdownItem): this;
    /**
     * Show the dropdown element
     *
     * @emits show
     * @emits shown
     */
    show(): this;
    /**
     * Hide the dropdown element
     *
     * @emits hide
     * @emits hidden
     */
    hide(): this;
    /** Clear search results */
    clear(): this;
    up(e: CustomEvent): this;
    down(e: CustomEvent): this;
    moveActiveItem(direction: "next" | "prev", e: CustomEvent): this;
    activate(index: number): this;
    isShown(): boolean;
    getActiveItem(): DropdownItem | null;
    setOffset(cursorOffset: CursorOffset): this;
    private getNextActiveIndex;
    private getPrevActiveIndex;
    private renderItems;
    private setStrategyId;
    private renderEdge;
}
declare class DropdownItem {
    private readonly dropdown;
    private readonly index;
    readonly searchResult: SearchResult<unknown>;
    private readonly props;
    readonly el: HTMLLIElement;
    private active;
    private readonly className;
    private readonly activeClassName;
    constructor(dropdown: Dropdown, index: number, searchResult: SearchResult<unknown>, props: DropdownItemOption);
    destroy(): this;
    activate(): this;
    deactivate(): this;
    private onClick;
}
export {};
