import { Request, Response, NextFunction } from 'express';
interface RequestWithStartTime extends Request {
    startTime?: number;
}
export declare const requestLogger: (req: RequestWithStartTime, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=requestLogger.d.ts.map