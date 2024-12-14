import { Controller, Get, Post, Body, Delete, RequestMapping, Request, Header, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './list.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { X_AUTH_TOKEN } from 'src/constants/constants';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/list')
  async addToList(@Headers(X_AUTH_TOKEN) userId: string, @Body() createListItemDto: CreateListItemDto) {
    return this.userService.addToList(userId, createListItemDto);
  }

  @Delete('/list/:id')
  async removeFromList(@Headers(X_AUTH_TOKEN) userId: string, @Param('id') itemId: string) {
    return this.userService.removeFromList(userId, itemId);
  }

  @Get('/list')
  async listMyItems(@Headers(X_AUTH_TOKEN) userId: string){
    return this.userService.listMyItems(userId);
  }

  @Get()
  async listUser(@Headers(X_AUTH_TOKEN) userId: string,) {
    return this.userService.listUser(userId)
  }
}
