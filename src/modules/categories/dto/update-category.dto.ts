import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه دسته بندی را وارد کنید' })
  @IsString({ message: 'شناسه دسته بندی را به صورت رشته وارد کنید' })
  id: string;
}
