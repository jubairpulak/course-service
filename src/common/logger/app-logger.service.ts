// src/common/logger/app-logger.service.ts
import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { RequestContextStore } from './request-context';

type Meta = Record<string, any>;
type LogPayload = string | number | boolean | null | Meta | any[];

type LevelName = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'VERBOSE';

@Injectable()
export class AppLogger implements LoggerService {
  private context?: string;

  // PROD default: log,warn,error
  // DEV default: log,warn,error,debug,verbose
  private readonly enabledLevels = new Set<LogLevel>(
    (process.env.LOG_LEVELS
      ? process.env.LOG_LEVELS.split(',').map((x) => x.trim())
      : process.env.NODE_ENV === 'production'
        ? ['log', 'warn', 'error']
        : ['log', 'warn', 'error', 'debug', 'verbose']) as LogLevel[],
  );

  setContext(context: string) {
    this.context = context;
  }

  // --- Nest LoggerService compatibility (DO NOT pass object as 2nd arg here) ---
  log(message: LogPayload, context?: string) {
    if (!this.enabledLevels.has('log')) return;
    this.write('INFO', message, context);
  }

  warn(message: LogPayload, context?: string) {
    if (!this.enabledLevels.has('warn')) return;
    this.write('WARN', message, context);
  }

  error(message: LogPayload, trace?: string, context?: string) {
    if (!this.enabledLevels.has('error')) return;
    this.write('ERROR', this.attachTrace(message, trace), context);
  }

  debug(message: LogPayload, context?: string) {
    if (!this.enabledLevels.has('debug')) return;
    this.write('DEBUG', message, context);
  }

  verbose(message: LogPayload, context?: string) {
    if (!this.enabledLevels.has('verbose')) return;
    this.write('VERBOSE', message, context);
  }

  // --- Domain/Business structured logging (USE THESE in AuthService) ---
  info(event: string, meta: Meta = {}) {
    this.log({ event, ...meta });
  }

  warnEvent(event: string, meta: Meta = {}) {
    this.warn({ event, ...meta });
  }

  errorEvent(event: string, meta: Meta = {}, trace?: string) {
    this.error({ event, ...meta }, trace);
  }

  debugEvent(event: string, meta: Meta = {}) {
    this.debug({ event, ...meta });
  }

  // --- Internals ---
  private write(level: LevelName, message: LogPayload, context?: string) {
    const base = this.baseFields(level, context);
    const payload = this.normalizeMessage(message);

    const out = { ...base, ...payload };
    const line = this.safeJson(out);

    if (level === 'ERROR') console.error(line);
    else if (level === 'WARN') console.warn(line);
    else console.log(line);
  }

  private baseFields(level: LevelName, context?: string) {
    const req = RequestContextStore.get();

    return {
      level,
      timestamp: new Date().toISOString(),
      service: process.env.SERVICE_NAME ?? 'employee-service',
      env: process.env.NODE_ENV ?? 'development',
      context: context ?? this.context,

      requestId: req.requestId,
      traceId: req.traceId,
      userId: req.userId,

      method: req.method,
      path: req.path,
      ip: req.ip,
    };
  }

  private attachTrace(message: LogPayload, trace?: string) {
    if (!trace) return message;

    if (typeof message === 'string') return { message, trace };
    if (message && typeof message === 'object') return { ...(message as any), trace };
    return { message, trace };
  }

  private normalizeMessage(message: LogPayload): Meta {
    // Error instance normalize
    if (message instanceof Error) return this.normalizeError(message);

    // string => { message }
    if (typeof message === 'string') return { message };

    // object/array => merge
    if (message && typeof message === 'object') return { ...(message as any) };

    // primitive
    return { message };
  }

  private normalizeError(err: Error & { code?: any; meta?: any; status?: any }) {
    return {
      message: err.message,
      errorName: err.name,
      errorCode: err.code,
      status: (err as any).status,
      meta: (err as any).meta,
      stack: err.stack,
    };
  }

  private safeJson(obj: any) {
    const seen = new WeakSet<object>();
    return JSON.stringify(obj, (_k, v) => {
      if (typeof v === 'bigint') return v.toString();
      if (v && typeof v === 'object') {
        if (seen.has(v)) return '[Circular]';
        seen.add(v);
      }
      return v;
    });
  }
}
