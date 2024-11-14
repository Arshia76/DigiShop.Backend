import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'نام کاربر را وارد کنید' })
  firstName: string;

  @IsString({ message: 'نام خانوادگی کاربر را وارد کنید' })
  lastName: string;

  @IsString({ message: 'شاره موبایل کاربر را وارد کنید' })
  phoneNumber: string;

  @IsString({ message: 'نام کاربری کاربر را وارد کنید' })
  username: string;

  @IsString({ message: 'رمز عبور کاربر را وارد کنید' })
  password: string;
}
