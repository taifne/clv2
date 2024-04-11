import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    return await this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: any): Promise<Comment> {
    const comment = await this.commentRepository.findOne({where: {id}});
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne({where: {id}});
    this.commentRepository.merge(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne({where: {id}});
    await this.commentRepository.remove(comment);
  }
}
