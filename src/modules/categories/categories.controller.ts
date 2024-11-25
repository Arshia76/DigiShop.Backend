import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guard/admin.guard';

@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @Post('/create')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiBearerAuth()
  @Patch('/update')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }

  @ApiBearerAuth()
  @Delete('/:id/delete')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
