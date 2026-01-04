import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(err: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const requestId = req.headers['x-request-id'] as string | undefined;
    const timestamp = new Date().toISOString();

    /* ------------------ 1) Nest HTTP exceptions ------------------ */
    if (err instanceof HttpException) {
      return res.status(err.getStatus()).json({
        statusCode: err.getStatus(),
        error: err.getResponse(),
        path: req.originalUrl,
        requestId,
        timestamp,
      });
    }

    /* ------------------ 2) Prisma known errors ------------------ */
    if (err instanceof PrismaClientKnownRequestError) {
      // P2002 = unique constraint
      if (err.code === 'P2002') {
        const target = err.meta?.target;
        const fields =
          Array.isArray(target) ? target : typeof target === 'string' ? [target] : undefined;

        return res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Duplicate value',
          fields,
          code: err.code,
          path: req.originalUrl,
          requestId,
          timestamp,
        });
      }

      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Database error',
        code: err.code,
        meta: err.meta,
        path: req.originalUrl,
        requestId,
        timestamp,
      });
    }

    /* ------------------ 3) Prisma validation ------------------ */
    if (err instanceof PrismaClientValidationError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid database query',
        path: req.originalUrl,
        requestId,
        timestamp,
      });
    }

    /* ------------------ 4) Prisma init error ------------------ */
    if (err instanceof PrismaClientInitializationError) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Database unavailable',
        path: req.originalUrl,
        requestId,
        timestamp,
      });
    }

    /* ------------------ 5) Fallback ------------------ */
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: msg,
      path: req.originalUrl,
      requestId,
      timestamp,
    });
  }
}
