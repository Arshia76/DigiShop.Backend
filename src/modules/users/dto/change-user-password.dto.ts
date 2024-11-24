import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeUserPasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه کاربر را وارد کنید' })
  @IsString({ message: 'شناسه کاربر را به صورت رشته وارد کنید' })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'رمز عبور قبلی کاربر را وارد کنید' })
  @IsString({ message: 'رمز عبور قبلی کاربر را به صورت رشته وارد کنید' })
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'رمز عبور جدید کاربر را وارد کنید' })
  @IsString({ message: 'رمز عبور جدید کاربر را به صورت رشته وارد کنید' })
  newPassword: string;
}

export class ChangeUserPasswordByAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه کاربر را وارد کنید' })
  @IsString({ message: 'شناسه کاربر را به صورت رشته وارد کنید' })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'رمز عبور قبلی کاربر را وارد کنید' })
  @IsString({ message: 'رمز عبور قبلی کاربر را به صورت رشته وارد کنید' })
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'رمز عبور جدید کاربر را وارد کنید' })
  @IsString({ message: 'رمز عبور جدید کاربر را به صورت رشته وارد کنید' })
  confirmNewPassword: string;
}
