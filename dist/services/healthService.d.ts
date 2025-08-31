export declare class HealthService {
    static getHealthStatus(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        memory: {
            raw: NodeJS.MemoryUsage;
            formatted: {
                rss: number;
                heapTotal: number;
                heapUsed: number;
                external: number;
            };
            units: string;
        };
        system: {
            environment: string;
            nodeVersion: string;
            platform: NodeJS.Platform;
            arch: NodeJS.Architecture;
            pid: number;
        };
        api: {
            version: string;
            name: string;
            features: {
                apiKeyEnabled: boolean;
                rateLimitEnabled: boolean;
                corsEnabled: boolean;
                compressionEnabled: boolean;
                helmetEnabled: boolean;
            };
        };
        responseTime: number;
    }>;
    static checkDatabase(): Promise<{
        connected: boolean;
        responseTime: string;
    }>;
    static checkExternalServices(): Promise<{
        available: boolean;
        services: string[];
    }>;
}
//# sourceMappingURL=healthService.d.ts.map