import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getCategories() {
    return this.categoryModel.find();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { title } = createCategoryDto;
    const category = await this.categoryModel.findOne({ title });

    if (category) {
      throw new BadRequestException('دسته بندی موجود می باشد');
    }

    return this.categoryModel.create(createCategoryDto);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { id, title } = updateCategoryDto;
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('دسته بندی با این مشخصات یافت نشد');
    }

    const duplicateCategory = await this.categoryModel.findOne({ title });

    if (category) {
      throw new BadRequestException('دسته بندی موجود می باشد');
    }

    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('دسته بندی با این مشخصات یافت نشد');
    }

    return this.categoryModel.findByIdAndDelete(id);
  }
}
