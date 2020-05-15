"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtilities {
    static generateRandomString(length) {
        let state = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            state += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return state;
    }
}
exports.default = StringUtilities;
//# sourceMappingURL=StringUtilities.js.map