import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'استان را وارد کنید' })
  province: string;

  @IsString({ message: 'شهر را وارد کنید' })
  city: string;

  @IsString({ message: 'کدپستی را وارد کنید' })
  postalCode: string;

  @IsString({ message: 'آدرس را وارد کنید' })
  address: string;

  @IsString({ message: 'کاربر را مشخص کنید' })
  user: string;
}
