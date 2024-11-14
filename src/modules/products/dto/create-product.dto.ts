import { IsNumber, IsString } from 'class-validator';
import { Category } from 'src/modules/categories/category.schema';

export class CreateProductDto {
  @IsString({ message: 'عنوان محصول را وارد کنید' })
  title: string;

  @IsNumber({ allowNaN: false })
  price: number;

  @IsString({ message: 'توضیحات محصول را وارد کنید' })
  description: string;

  @IsString({ message: 'تصویر محصول را وارد کنید' })
  image: string;

  @IsString({ message: 'دسته بندی محصول را مشخص کنید' })
  category: Category;
}
