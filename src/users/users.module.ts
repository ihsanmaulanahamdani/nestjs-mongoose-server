import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";

import { UserSchema } from "./user.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule {}
