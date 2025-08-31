import { ApiResponse } from '../types';
export declare class ApiResponseBuilder {
    static success<T>(data?: T, message?: string): ApiResponse<T>;
    static error(error: string, message?: string): ApiResponse;
}
//# sourceMappingURL=response.d.ts.map