export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    timestamp: string;
}
export interface ApiKey {
    key: string;
    name?: string;
    permissions?: string[];
    createdAt: Date;
    lastUsed?: Date;
    isActive: boolean;
}
export interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
}
export interface Config {
    port: number;
    nodeEnv: string;
    apiKeyEnabled: boolean;
    defaultApiKey: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    rateLimitEnabled: boolean;
    rateLimit: RateLimitConfig;
    corsEnabled: boolean;
    corsOrigin: string;
    logLevel: string;
    logFile: string;
    compressionEnabled: boolean;
    helmetEnabled: boolean;
}
//# sourceMappingURL=index.d.ts.map