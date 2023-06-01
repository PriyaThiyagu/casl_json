import { Controller, Get, Body, Patch,Post, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { checkAbilites, checkRole } from 'src/ability/abilities.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @checkRole('User')
  @checkAbilites({action:'create',subject:'Post'})
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @checkRole('User')
  @checkAbilites({action:'read',subject:'Post'})
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @checkRole('User')
  @checkAbilites({action:'read',subject:'Post'})
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @checkRole('User')
  @checkAbilites({action:'update',subject:'Post'})
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @checkRole('User')
  @checkAbilites({action:'delete',subject:'Post'})
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
