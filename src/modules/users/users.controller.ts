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
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Role } from '@/shared/enum';
import { CurrentUserGuard } from '../auth/guard/current-user.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}
  @Get('')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @Patch('/changePassword')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  changePassword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    return this.userService.changeUserPassword(changeUserPasswordDto);
  }

  @Delete('/:id/delete')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
