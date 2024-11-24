import { IsString } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsString({ message: 'شناسه کاربر را وارد کنید' })
  id: string;

  @IsString({ message: 'رمز عبور قبلی کاربر را وارد کنید' })
  oldPassword: string;

  @IsString({ message: 'رمز عبور جدید کاربر را وارد کنید' })
  newPassword: string;
}

export class ChangeUserPasswordByAdminDto {
  @IsString({ message: 'شناسه کاربر را وارد کنید' })
  id: string;

  @IsString({ message: 'رمز عبور قبلی کاربر را وارد کنید' })
  newPassword: string;

  @IsString({ message: 'رمز عبور جدید کاربر را وارد کنید' })
  confirmNewPassword: string;
}
