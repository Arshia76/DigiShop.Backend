import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @ApiProperty({ example: 'arshia' })
  @IsNotEmpty({ message: 'نام کاربری را وارد کنید' })
  @IsString({ message: 'نام کاربری را به صورت رشته وارد کنید' })
  username: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty({ message: 'رمز عبور را وارد کنید' })
  @IsString({ message: 'رمز عبور را به صورت رشته وارد کنید' })
  password: string;
}
