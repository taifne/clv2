import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from '@/modules/comment/comment.service';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@/modules/comment/dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.commentsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: string) {
    return await this.commentsService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: string) {
    await this.commentsService.remove(+id);
    const hihi="hihdsd";
    return { message: 'Comment deleted haha' };
  }
}
