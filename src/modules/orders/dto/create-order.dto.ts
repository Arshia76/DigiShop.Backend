import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class Address {
  @ApiProperty()
  @IsNotEmpty({ message: 'استان را وارد کنید' })
  @IsString({ message: 'استان را به صورت رشته وارد کنید' })
  province: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'شهر را وارد کنید' })
  @IsString({ message: 'شهر را به صورت رشته وارد کنید' })
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'کدپستی را وارد کنید' })
  @IsString({ message: 'کدپستی را به صورت رشته وارد کنید' })
  postalCode: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'آدرس دقیق را وارد کنید' })
  @IsString({ message: 'آدرس دقیق را به صورت رشته وارد کنید' })
  detail: string;
}

class OrderProduct {
  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه محصول را وارد کنید' })
  @IsString({ message: 'شناسه محصول را به صورت رشته وارد کنید' })
  productId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'تعداد انتخاب شده محصول را وارد کنید' })
  @IsNumber(
    {},
    {
      message: 'تعداد انتخاب شده محصول را به صورت عددی وارد کنید',
    },
  )
  @IsPositive({ message: 'تعداد انتخاب شده محصول باید مقداری مثبت باشد' })
  selectedQuantity: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: () => Address })
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products: OrderProduct[];
}
