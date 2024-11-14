import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return this.userModel.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { id } = updateUserDto;
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    return this.userModel.findByIdAndUpdate(updateUserDto);
  }

  async changeUserPassword(changeUserPasswordDto: ChangeUserPasswordDto) {
    const { id, oldPassword, newPassword } = changeUserPasswordDto;
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    if (user.toJSON().password !== oldPassword) {
      throw new BadRequestException('رمز عبور قبلی وارد شده مطابقت ندارد ');
    }

    user.toJSON().password = newPassword;

    return user.save();
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    return this.userModel.findByIdAndDelete(id);
  }
}
