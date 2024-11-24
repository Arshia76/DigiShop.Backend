import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { deleteFile } from '@/shared/utils';
import { ProductQueryDto } from './dto/product-query.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getProducts(productQueryDto: ProductQueryDto) {
    const { category, query, sort } = productQueryDto;
    return this.productModel
      .find({ category: category, title: query })
      .populate('category')
      .sort({ [sort]: 'desc' })
      .lean();
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id).populate('category');

    if (!product) {
      throw new NotFoundException('محصولی با این مشخصات یافت نشد');
    }
    return product;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    productImage: Express.Multer.File,
  ) {
    const category = await this.categoriesService.findCategoryById(
      createProductDto.category,
    );

    if (!category) {
      throw new NotFoundException('دسته بندی موجود نمی باشد');
    }

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

    const category = await this.categoriesService.findCategoryById(
      updateProductDto.category,
    );

    if (!category) {
      throw new NotFoundException('دسته بندی موجود نمی باشد');
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
