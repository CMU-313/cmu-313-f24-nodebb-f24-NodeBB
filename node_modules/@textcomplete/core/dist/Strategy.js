"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = exports.DEFAULT_INDEX = void 0;
const SearchResult_1 = require("./SearchResult");
exports.DEFAULT_INDEX = 1;
class Strategy {
    constructor(props) {
        this.props = props;
        this.cache = {};
    }
    destroy() {
        this.cache = {};
        return this;
    }
    replace(data) {
        return this.props.replace(data);
    }
    execute(beforeCursor, callback) {
        var _a;
        const match = this.matchWithContext(beforeCursor);
        if (!match)
            return false;
        const term = match[(_a = this.props.index) !== null && _a !== void 0 ? _a : exports.DEFAULT_INDEX];
        this.search(term, (results) => {
            callback(results.map((result) => new SearchResult_1.SearchResult(result, term, this)));
        }, match);
        return true;
    }
    renderTemplate(data, term) {
        if (this.props.template) {
            return this.props.template(data, term);
        }
        if (typeof data === "string")
            return data;
        throw new Error(`Unexpected render data type: ${typeof data}. Please implement template parameter by yourself`);
    }
    getId() {
        return this.props.id || null;
    }
    match(text) {
        return typeof this.props.match === "function"
            ? this.props.match(text)
            : text.match(this.props.match);
    }
    search(term, callback, match) {
        if (this.props.cache) {
            this.searchWithCach(term, callback, match);
        }
        else {
            this.props.search(term, callback, match);
        }
    }
    matchWithContext(beforeCursor) {
        const context = this.context(beforeCursor);
        if (context === false)
            return null;
        return this.match(context === true ? beforeCursor : context);
    }
    context(beforeCursor) {
        return this.props.context ? this.props.context(beforeCursor) : true;
    }
    searchWithCach(term, callback, match) {
        if (this.cache[term] != null) {
            callback(this.cache[term]);
        }
        else {
            this.props.search(term, (results) => {
                this.cache[term] = results;
                callback(results);
            }, match);
        }
    }
}
exports.Strategy = Strategy;
//# sourceMappingURL=Strategy.js.map