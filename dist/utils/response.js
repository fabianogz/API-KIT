"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseBuilder = void 0;
class ApiResponseBuilder {
    static success(data, message) {
        return {
            success: true,
            data,
            message,
            timestamp: new Date().toISOString()
        };
    }
    static error(error, message) {
        return {
            success: false,
            error,
            message,
            timestamp: new Date().toISOString()
        };
    }
}
exports.ApiResponseBuilder = ApiResponseBuilder;
//# sourceMappingURL=response.js.map