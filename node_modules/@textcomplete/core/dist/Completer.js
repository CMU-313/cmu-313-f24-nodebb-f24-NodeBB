"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Completer = void 0;
const eventemitter3_1 = require("eventemitter3");
const Strategy_1 = require("./Strategy");
class Completer extends eventemitter3_1.EventEmitter {
    constructor(strategyPropsList) {
        super();
        this.handleQueryResult = (searchResults) => {
            this.emit("hit", { searchResults });
        };
        this.strategies = strategyPropsList.map((p) => new Strategy_1.Strategy(p));
    }
    destroy() {
        this.strategies.forEach((s) => s.destroy());
        return this;
    }
    run(beforeCursor) {
        for (const strategy of this.strategies) {
            const executed = strategy.execute(beforeCursor, this.handleQueryResult);
            if (executed)
                return;
        }
        this.handleQueryResult([]);
    }
}
exports.Completer = Completer;
//# sourceMappingURL=Completer.js.map