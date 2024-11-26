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
    return this.categoryModel.find().lean();
  }

  async findCategoryById(id: string) {
    return this.categoryModel.findById(id).lean();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { title } = createCategoryDto;
    const category = await this.categoryModel.findOne({ title }).lean();

    if (category) {
      throw new BadRequestException('دسته بندی موجود می باشد');
    }

    const createdCategory = await this.categoryModel.create(createCategoryDto);
    return createdCategory.toJSON();
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { id, title } = updateCategoryDto;
    const category = await this.categoryModel.findById(id).lean();

    if (!category) {
      throw new NotFoundException('دسته بندی با این مشخصات یافت نشد');
    }

    const duplicateCategory = await this.categoryModel
      .findOne({ title })
      .lean();

    if (duplicateCategory) {
      throw new BadRequestException('دسته بندی موجود می باشد');
    }

    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .lean();
  }

  async deleteCategory(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('دسته بندی با این مشخصات یافت نشد');
    }

    return this.categoryModel.findOneAndDelete({ _id: id }).lean();
  }
}
