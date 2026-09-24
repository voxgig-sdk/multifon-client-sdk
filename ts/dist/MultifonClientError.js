"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultifonClientError = void 0;
class MultifonClientError extends Error {
    isMultifonClientError = true;
    sdk = 'MultifonClient';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MultifonClientError = MultifonClientError;
//# sourceMappingURL=MultifonClientError.js.map