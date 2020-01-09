import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UsersService } from "./users.service";

@Controller("users")
export class UserController {
  constructor(private readonly usersServices: UsersService) {}

  @Post()
  async createUser(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return await this.usersServices.createUser({ name, email, password });
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getAllUsers() {
    return await this.usersServices.getAllUsers();
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return await this.usersServices.getUser(id);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return await this.usersServices.updateUser(id, { name, email, password });
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return await this.usersServices.deleteUser(id);
  }
}
