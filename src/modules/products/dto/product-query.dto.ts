import { IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
  @IsString()
  @IsOptional()
  query: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  sort: 'date' | 'price';
}
