import { EventEmitter } from "eventemitter3";
import { StrategyProps } from "./Strategy";
export declare class Completer extends EventEmitter {
    private readonly strategies;
    constructor(strategyPropsList: StrategyProps<unknown>[]);
    destroy(): this;
    run(beforeCursor: string): void;
    private handleQueryResult;
}
