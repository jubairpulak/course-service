// src/common/auth/authenticated-request.type.ts
import { Request } from 'express';
import { JwtUser } from './jwt-user.type';
export type AuthenticatedRequest = Request & { user?: JwtUser };
