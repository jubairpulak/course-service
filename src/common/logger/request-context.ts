import { AsyncLocalStorage } from 'node:async_hooks';

export type RequestContext = {
  requestId?: string;
  traceId?: string;
  userId?: string;
  ip?: string;
  method?: string;
  path?: string;
};

const als = new AsyncLocalStorage<RequestContext>();

export const RequestContextStore = {
  run<T>(ctx: RequestContext, fn: () => T) {
    return als.run(ctx, fn);
  },
  get(): RequestContext {
    return als.getStore() ?? {};
  },
};
