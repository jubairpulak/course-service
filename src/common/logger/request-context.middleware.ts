import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { RequestContextStore } from './request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId =
      (req.headers['x-request-id'] as string) ||
      (req.headers['x-correlation-id'] as string) ||
      randomUUID();

    res.setHeader('x-request-id', requestId);

    RequestContextStore.run(
      {
        requestId,
        ip: req.ip,
        method: req.method,
        path: req.originalUrl,
      },
      next,
    );
  }
}
