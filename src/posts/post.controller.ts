import { Controller, Get, Post, Body } from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Post()
  async create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }
}
