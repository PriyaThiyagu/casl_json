import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { checkAbilites, checkRole } from 'src/ability/abilities.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @checkRole('Admin')
  @checkAbilites({ action: 'create', subject: 'User' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @checkRole('Admin')
  @checkAbilites({ action: 'read', subject: 'User' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @checkRole('Admin')
  @checkAbilites({ action: 'read', subject: 'User' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @checkRole('Admin')
  @checkAbilites({ action: 'update', subject: 'User'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @checkRole('Admin')
  @checkAbilites({ action: 'delete', subject: 'User' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}


