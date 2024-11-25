import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { AdminGuard } from '../auth/guard/admin.guard';
import { ProductQueryDto } from './dto/product-query.dto';
import { ApiBearerAuth, ApiConsumes, ApiProperty } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(readonly productService: ProductsService) {}

  @Get()
  getProducts(@Query() productQueryDto: ProductQueryDto) {
    return this.productService.getProducts(productQueryDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post('/create')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename(req, file, callback) {
          if (!file)
            throw new BadRequestException('تصویر محصول را انتخاب کنید');
          const filename =
            file.originalname + '-' + Date.now() + extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024,
            message: 'اندازه عکس باید  کمتر از 1 مگابایت باشد',
          }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png)$' }),
        ],
      }),
    )
    productImage: Express.Multer.File,
  ) {
    return this.productService.createProduct(createProductDto, productImage);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Patch('/update')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename(req, file, callback) {
          const filename =
            file.originalname + '-' + Date.now() + extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png)$' }),
        ],
      }),
    )
    productImage?: Express.Multer.File,
  ) {
    return this.productService.updateProduct(updateProductDto, productImage);
  }

  @ApiBearerAuth()
  @Delete('/:id/delete')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
