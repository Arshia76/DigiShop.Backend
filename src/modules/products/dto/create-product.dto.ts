import { IsNumberString, IsString } from 'class-validator';
import { Category } from 'src/modules/categories/category.schema';

export class CreateProductDto {
  @IsString({ message: 'عنوان محصول را وارد کنید' })
  title: string;

  @IsNumberString({}, { message: 'قیمت محصول را وارد کنید' })
  price: string;

  @IsNumberString({}, { message: 'تعداد محصول را وارد کنید' })
  quantity: string;

  @IsString({ message: 'توضیحات محصول را وارد کنید' })
  description: string;

  @IsString({ message: 'دسته بندی محصول را مشخص کنید' })
  category: Category;

  // @IsString({ message: 'تصویر محصول را مشخص کنید' })
  // image: string;
}
