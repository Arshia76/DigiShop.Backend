import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  ChangeUserPasswordByAdminDto,
  ChangeUserPasswordDto,
} from './dto/change-user-password.dto';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { CurrentUserGuard } from '../auth/guard/current-user.guard';
import { AdminGuard } from '../auth/guard/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}
  @Get('')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post('/create')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/update')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Patch('/changeUserPassword')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  changeUserPassword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    return this.userService.changeUserPassword(changeUserPasswordDto);
  }

  @Patch('/changeUserPasswordByAdmin')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  changeUserPasswordByAdmin(
    @Body() changeUserPasswordByAdminDto: ChangeUserPasswordByAdminDto,
  ) {
    return this.userService.changeUserPasswordByAdmin(
      changeUserPasswordByAdminDto,
    );
  }

  @Delete('/:id/delete')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
