import { SearchResult } from "./SearchResult";
export type SearchCallback<T> = (results: T[]) => void;
type ReplaceResult = [string, string] | string | null;
export interface StrategyProps<T = any> {
    match: RegExp | ((regexp: string | RegExp) => RegExpMatchArray | null);
    search: (term: string, callback: SearchCallback<T>, match: RegExpMatchArray) => void;
    replace: (data: T) => ReplaceResult;
    cache?: boolean;
    context?: (text: string) => string | boolean;
    template?: (data: T, term: string) => string;
    index?: number;
    id?: string;
}
export declare const DEFAULT_INDEX = 1;
export declare class Strategy<T> {
    private readonly props;
    private cache;
    constructor(props: StrategyProps<T>);
    destroy(): this;
    replace(data: T): ReplaceResult;
    execute(beforeCursor: string, callback: (searchResults: SearchResult<T>[]) => void): boolean;
    renderTemplate(data: T, term: string): string;
    getId(): string | null;
    match(text: string): RegExpMatchArray | null;
    private search;
    private matchWithContext;
    private context;
    private searchWithCach;
}
export {};
