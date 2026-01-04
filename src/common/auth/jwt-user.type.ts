// src/common/auth/jwt-user.type.ts
export type JwtUser = { sub: string; email?: string; roles?: string[]; tenantId?: string };
