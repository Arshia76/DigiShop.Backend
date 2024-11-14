import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(readonly productService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Post('/create')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Patch('/update')
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto);
  }

  @Delete('/:id/delete')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
