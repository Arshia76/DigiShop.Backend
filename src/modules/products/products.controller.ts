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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Role } from '@/shared/enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ProductQueryDto } from './dto/product-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  @Post('/create')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png)$' }),
        ],
      }),
    )
    productImage: Express.Multer.File,
  ) {
    return this.productService.createProduct(createProductDto, productImage);
  }

  @ApiBearerAuth()
  @Patch('/update')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
