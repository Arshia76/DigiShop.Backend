import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  async localSignin(SigninUserDto: SigninUserDto) {
    const { username, password } = SigninUserDto;
    const user = await this.userService.find({
      username,
    });

    if (!user) {
      throw new NotFoundException('کاربری با این مشخصات یافت نشد.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException('خطا در اطلاعات', 400);
    }

    const payload = { username, role: user.role, id: user.id };

    const data = {
      access_token: this.jwtService.sign(payload, {
        secret: '123',
        expiresIn: '1d',
      }),
      id: user.id,
    };

    return data;
  }

  async localSignup(createUserDto: CreateUserDto) {
    const { phoneNumber, username } = createUserDto;

    const userExist = await this.userService.find({ username, phoneNumber });

    if (userExist) {
      throw new BadRequestException('کاربری با این اطلاعات ثبت شده است');
    }

    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.hash(password);
    const userData = {
      ...rest,
      password: hashedPassword,
    };
    const user = await this.userService.createUser(userData);

    const payload = { username, role: user.role, id: user.id };

    const data = {
      access_token: this.jwtService.sign(payload, {
        secret: '123',
        expiresIn: '1d',
      }),
      id: user.id,
    };
    return data;
  }

  async hash(data: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }
}
