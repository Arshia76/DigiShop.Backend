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
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  // @Get(':id')
  // getUser(@Param('id') id: string) {
  //   return this.userService.
  // }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Patch('/changePassword')
  changePassword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    return this.userService.changeUserPassword(changeUserPasswordDto);
  }

  @Delete('/:id/delete')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
