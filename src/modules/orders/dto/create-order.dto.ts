import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class Address {
  @IsString({ message: 'استان را وارد کنید' })
  province: string;

  @IsString({ message: 'شهر را وارد کنید' })
  city: string;

  @IsString({ message: 'کدپستی را وارد کنید' })
  postalCode: string;

  @IsString({ message: 'آدرس دقیق را وارد کنید' })
  detail: string;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @IsString({ message: 'قیمت کل  را مشخص کنید' })
  totalAmount: string;

  @IsString({ message: 'تاریخ را مشخص کنید' })
  date: string;

  @IsString({ message: 'شناسه کاربر را مشخص کنید' })
  userId: string;
}
