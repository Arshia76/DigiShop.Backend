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
import { Roles } from '@/shared/decorators/roles.decorator';
import { Role } from '@/shared/enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @Post('/create')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiBearerAuth()
  @Patch('/update')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }

  @ApiBearerAuth()
  @Delete('/:id/delete')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
