import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { AppLogger } from '../logger/app-logger.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const start = Date.now();
    const requestId = req.headers['x-request-id'];

    const safeBody = this.sanitize(req.body);

    this.logger.log({
      msg: 'http_request',
      requestId,
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
      body: safeBody,
    });

    return next.handle().pipe(
      tap((responseBody) => {
        this.logger.log({
          msg: 'http_response',
          requestId,
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          durationMs: Date.now() - start,
        });
      }),
      catchError((err) => {
        this.logger.error({
          msg: 'http_error',
          requestId,
          method: req.method,
          path: req.originalUrl,
          statusCode: err?.status || 500,
          durationMs: Date.now() - start,
          error: err?.message,
        });
        throw err;
      }),
    );
  }

  private sanitize(body: any) {
    if (!body) return undefined;

    const clone = { ...body };
    if ('password' in clone) clone.password = '***';
    if ('refreshToken' in clone) clone.refreshToken = '***';

    return clone;
  }
}
