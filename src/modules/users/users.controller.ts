import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}
  @Get()
  getUsers() {}

  @Get(':id')
  getUser(@Param('id') id: string) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {}

  @Patch('/update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {}

  @Patch('/changePassword')
  changePassword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {}

  @Delete('/:id/delete')
  deleteUser(@Param('id') id: string) {}
}
