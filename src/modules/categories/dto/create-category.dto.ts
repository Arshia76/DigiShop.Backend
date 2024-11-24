import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'عنوان دسته بندی را وارد کنید' })
  @IsString({ message: 'عنوان دسته بندی را به صورت رشته وارد کنید' })
  title: string;
}
