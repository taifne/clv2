import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/user/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async update(@Param('id',ParseIntPipe) id: string, @Body() userData: Partial<User>): Promise<User> {
    return this.userService.update(+id, userData);
  }

  @Delete(':id',)
  async remove(@Param('id',ParseIntPipe) id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
