import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsNotEmpty({ message: 'شناسه محصول را وارد کنید' })
  @IsString({ message: 'شناسه محصول را به صورت رشته وارد کنید' })
  id: string;
}
