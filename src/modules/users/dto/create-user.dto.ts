import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'نام کاربر را وارد کنید' })
  @IsString({ message: 'نام کاربر را به صورت رشته وارد کنید' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'نام خانوادگی کاربر را وارد کنید' })
  @IsString({ message: 'نام خانوادگی کاربر را به صورت رشته وارد کنید' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'شماره موبایل کاربر را وارد کنید' })
  @IsString({ message: 'شماره موبایل کاربر را به صورت رشته وارد کنید' })
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'نام کاربری کاربر را وارد کنید' })
  @IsString({ message: 'نام کاربری کاربر را به صورت رشته وارد کنید' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'رمز عبور کاربر را وارد کنید' })
  @IsString({ message: 'رمز عبور کاربر را به صورت رشته وارد کنید' })
  password: string;
}
