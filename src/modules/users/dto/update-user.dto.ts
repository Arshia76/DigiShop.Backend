import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
  'phoneNumber',
]) {
  @IsString({ message: 'شناسه کاربر را وارد کنید' })
  id: string;
}
