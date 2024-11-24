import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'عنوان باید به صورت رشته وارد شود' })
  query: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'دسته بندی باید به صورت رشته وارد شود' })
  category: string;

  @ApiProperty({ required: false, enum: ['date', 'price'] })
  @IsOptional()
  @IsIn(['date', 'price'], {
    message: 'مقادیر ورودی شامل date و price می باشد',
  })
  sort: 'date' | 'price';
}
