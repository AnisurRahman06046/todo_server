import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //   register user
  async createUser(payload: CreateUserDto) {
    const isUser = await this.userModel.findOne({ email: payload.email });
    if (isUser)
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    const result = await this.userModel.create(payload);
    return result;
  }

  //   get all users
  async users() {
    const result = await this.userModel.find({});
    return result;
  }

  //   single user
  async user(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
