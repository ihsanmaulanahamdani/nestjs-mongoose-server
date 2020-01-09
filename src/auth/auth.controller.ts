import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  UseGuards
} from "@nestjs/common";

import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  tempAuth() {
    return { auth: "works" };
  }

  @Post("login")
  async login(@Body() userDto: LoginDto) {
    try {
      const user = await this.userService.findByLogin(userDto);

      const token = await this.authService.signPayload(user);

      return { token, user };
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  @Post("register")
  async register(@Body() userDto: RegisterDto) {
    try {
      const user = await this.userService.createUser(userDto);

      const payload = {
        name: user.name,
        email: user.email
      };

      const token = await this.authService.signPayload(payload);

      return { token, user };
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }
}
