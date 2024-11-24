import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه کاربر را وارد کنید' })
  @IsString({ message: 'شناسه کاربر را به صورت رشته وارد کنید' })
  id: string;
}
