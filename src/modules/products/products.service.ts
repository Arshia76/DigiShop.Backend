import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts() {
    return this.productModel.find();
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const { id } = updateProductDto;

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }

    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }

    return this.productModel.findByIdAndDelete(id);
  }
}
