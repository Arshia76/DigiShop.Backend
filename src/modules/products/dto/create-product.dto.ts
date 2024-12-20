import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'عنوان محصول را وارد کنید' })
  @IsString({ message: 'عنوان محصول را به صورت رشته وارد کنید' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'قیمت محصول را وارد کنید' })
  @IsNumberString({}, { message: 'قیمت محصول را به صورت رشته وارد کنید' })
  price: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'تعداد محصول را وارد کنید' })
  @IsNumberString({}, { message: 'تعداد محصول را به صورت رشته وارد کنید' })
  quantity: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'توضیحات محصول را وارد کنید' })
  @IsString({ message: 'توضیحات محصول را به صورت رشته وارد کنید' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'دسته بندی محصول را مشخص کنید' })
  @IsString({ message: 'دسته بندی محصول باید به صورت رشته وارد شود' })
  category: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}
