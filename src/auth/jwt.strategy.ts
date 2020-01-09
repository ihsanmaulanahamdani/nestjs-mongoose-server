import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";

import { AuthService } from "./auth.service";
import { jwtConstant } from "./constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      return done(
        new HttpException("Unauthorized access!", HttpStatus.UNAUTHORIZED),
        false
      );
    }

    done(null, user, payload.iat);
  }
}
