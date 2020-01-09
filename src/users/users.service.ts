import { Model } from "mongoose";
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";

import { User } from "./user.interface";
import { CreateUserDto } from "./user.dto";
import { LoginDto } from "src/auth/auth.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly User: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.User.create(createUserDto);
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  async findByLogin(userDto: LoginDto) {
    try {
      const { email, password } = userDto;

      const user = await this.User.findOne({ email });

      if (!user)
        throw new HttpException(
          "Email or Password Wrong!",
          HttpStatus.UNAUTHORIZED
        );

      if (await bcrypt.compare(password, user.password)) {
        return { name: user.name, email: user.email };
      } else {
        throw new HttpException(
          "Email or Password Wrong!",
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  async findByPayload(payload: any) {
    try {
      const { email } = payload;

      return await this.User.findOne({ email });
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.User.find().exec();
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  async getUser(_id: string): Promise<User> {
    try {
      return await this.User.findById(_id);
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  async updateUser(_id: string, createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.User.findOneAndUpdate({ _id }, createUserDto);
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }

  async deleteUser(_id: string): Promise<User> {
    try {
      return await this.User.findOneAndRemove({ _id });
    } catch (error) {
      throw new NotFoundException("Oops! Something Went Wrong!");
    }
  }
}
