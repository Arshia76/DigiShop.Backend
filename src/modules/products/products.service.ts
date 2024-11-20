import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { deleteFile } from '@/shared/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts() {
    return this.productModel.find().populate('category').lean();
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }
    return product;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    productImage: Express.Multer.File,
  ) {
    return this.productModel.create({
      ...createProductDto,
      image: productImage.path,
    });
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    productImage: Express.Multer.File,
  ) {
    const { id } = updateProductDto;

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }

    if (productImage) {
      if (product.image) deleteFile('./' + product.image);

      return this.productModel.findByIdAndUpdate(id, {
        ...updateProductDto,
        image: productImage.path,
      });
    }

    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }

    if (product.image) deleteFile('./' + product.image);

    return this.productModel.findByIdAndDelete(id);
  }
}
