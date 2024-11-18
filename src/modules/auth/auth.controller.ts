import { Controller, Post, Header, HttpCode, Body } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/localSignin')
  @Header('Content-Type', 'application/json')
  @Header('charset', 'utf-8')
  @HttpCode(200)
  localLogin(@Body() loginUserDto: SigninUserDto) {
    return this.authService.localSignin(loginUserDto);
  }

  @Post('/localSignup')
  @Header('Content-Type', 'application/json')
  @Header('charset', 'utf-8')
  localRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.localSignup(createUserDto);
  }
}
