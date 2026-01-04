import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // IMPORTANT: use RS256 public key if you want, but keep simple now:
      secretOrKey: process.env.JWT_SECRET, // or publicKey if RS256
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    // attach in req.user
    return {
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles ?? [],
      tenantId: payload.tenantId,
    };
  }
}
