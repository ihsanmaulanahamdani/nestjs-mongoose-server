import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signPayload(payload: any) {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
