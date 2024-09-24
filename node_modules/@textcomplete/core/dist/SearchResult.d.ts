import { Strategy } from "./Strategy";
export declare class SearchResult<T = unknown> {
    readonly data: T;
    private readonly term;
    private readonly strategy;
    constructor(data: T, term: string, strategy: Strategy<T>);
    getReplacementData(beforeCursor: string): {
        start: number;
        end: number;
        beforeCursor: string;
        afterCursor: string;
    } | null;
    replace(beforeCursor: string, afterCursor: string): [string, string] | void;
    render(): string;
    getStrategyId(): string | null;
}
