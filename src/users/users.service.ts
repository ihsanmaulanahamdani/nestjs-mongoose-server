import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./user.interface";
import { CreateUserDto } from "./user.dto";

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
