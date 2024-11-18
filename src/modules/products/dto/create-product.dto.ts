import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Category } from 'src/modules/categories/category.schema';

export class CreateProductDto {
  @IsString({ message: 'عنوان محصول را وارد کنید' })
  title: string;

  @IsString()
  // @IsNumber({ allowNaN: false }, { message: 'قیمت محصول را وارد کنید' })
  // @IsPositive({ message: 'قیمت محصول را به درستی وارد کنید' })
  price: number;

  @IsString()
  // @IsNumber({ allowNaN: false }, { message: 'تعداد محصول را وارد کنید' })
  // @IsPositive({ message: 'تعداد محصول را به درستی وارد کنید' })
  quantity: number;

  @IsString({ message: 'توضیحات محصول را وارد کنید' })
  description: string;

  @IsString({ message: 'دسته بندی محصول را مشخص کنید' })
  category: Category;
}
