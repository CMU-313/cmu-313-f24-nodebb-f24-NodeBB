"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
const MAIN = /\$&/g;
const PLACE = /\$(\d)/g;
class SearchResult {
    constructor(data, term, strategy) {
        this.data = data;
        this.term = term;
        this.strategy = strategy;
    }
    getReplacementData(beforeCursor) {
        let result = this.strategy.replace(this.data);
        if (result == null)
            return null;
        let afterCursor = "";
        if (Array.isArray(result)) {
            afterCursor = result[1];
            result = result[0];
        }
        const match = this.strategy.match(beforeCursor);
        if (match == null || match.index == null)
            return null;
        const replacement = result
            .replace(MAIN, match[0])
            .replace(PLACE, (_, p) => match[parseInt(p)]);
        return {
            start: match.index,
            end: match.index + match[0].length,
            beforeCursor: replacement,
            afterCursor: afterCursor,
        };
    }
    replace(beforeCursor, afterCursor) {
        const replacement = this.getReplacementData(beforeCursor);
        if (replacement === null)
            return;
        afterCursor = replacement.afterCursor + afterCursor;
        return [
            [
                beforeCursor.slice(0, replacement.start),
                replacement.beforeCursor,
                beforeCursor.slice(replacement.end),
            ].join(""),
            afterCursor,
        ];
    }
    render() {
        return this.strategy.renderTemplate(this.data, this.term);
    }
    getStrategyId() {
        return this.strategy.getId();
    }
}
exports.SearchResult = SearchResult;
//# sourceMappingURL=SearchResult.js.map