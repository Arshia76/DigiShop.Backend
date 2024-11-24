import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

export class CreateOrderDto {
  @ApiProperty({ type: () => Address })
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @IsNotEmpty({ message: 'قیمت کل  را مشخص کنید' })
  @IsString({ message: 'قیمت کل را به صورت رشته مشخص کنید' })
  totalAmount: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'تاریخ را مشخص کنید' })
  @IsString({ message: 'تاریخ را به صورت رشته مشخص کنید' })
  date: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه کاربر را مشخص کنید' })
  @IsString({ message: 'شناسه کاربر را به صورت رشته مشخص کنید' })
  userId: string;
}
