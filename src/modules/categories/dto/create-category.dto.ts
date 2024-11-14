import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'عنوان دسته بندی را وارد کنید' })
  title: string;
}
