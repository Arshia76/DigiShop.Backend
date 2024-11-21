import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async getUsers() {
    return this.userModel.find().lean();
  }

  async find({
    username,
    phoneNumber,
  }: {
    username?: string;
    phoneNumber?: string;
  }) {
    const user = await this.userModel.findOne({
      $or: [{ username }, { phoneNumber }],
    });

    // @ts-ignore
    if (!user || this.request?.body.id === user._id.toString()) return null;
    return user;
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { phoneNumber, username, password } = createUserDto;
    const user = await this.find({ phoneNumber, username });

    if (user) {
      throw new BadRequestException('کاربری با این مشخصات ثبت شده است');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { id, phoneNumber, username } = updateUserDto;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    const duplicateUser = await this.find({ username, phoneNumber });

    if (duplicateUser) {
      throw new BadRequestException('کاربری با این مشخصات ثبت شده است');
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async changeUserPassword(changeUserPasswordDto: ChangeUserPasswordDto) {
    const { id, oldPassword, newPassword } = changeUserPasswordDto;
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('رمز ورودی اشتباه است');
    }

    const salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(newPassword, salt);

    return user.save();
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('کاربری با این اطلاعات وجود ندارد');
    }

    return this.userModel.findOneAndDelete({ _id: id });
  }
}
