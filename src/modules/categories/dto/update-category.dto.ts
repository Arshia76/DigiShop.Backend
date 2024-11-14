import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString({ message: 'شناسه دسته بندی را وارد کنید' })
  id: string;
}
