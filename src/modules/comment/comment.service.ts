import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@/modules/comment/comment.entity';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@/modules/comment/dto/update-comment.dto';

import { Post } from '@/modules/post/post.entity';
import { User } from '@/modules/user/doman/user';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { postId, userId, ...commentData } = createCommentDto;
    const post = await this.postRepository.findOne({where: {id: postId}});
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newComment = this.commentRepository.create({
      ...commentData,
      post:postId,
      user:userId,
    });

    return await this.commentRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { deletedAt: null },
      relations: ['post', 'user'],
    });
    if (comments.length === 0) {
      throw new NotFoundException('No comments found');
    }
    return comments;
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, deletedAt: null } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await this.findOne(id);
      this.commentRepository.merge(comment, updateCommentDto);
      return await this.commentRepository.save(comment);
    } catch (error) {
   
      throw new NotFoundException('Comment not found');
    }
  }  
  
  async remove(id: number, softDelete: boolean = true): Promise<void> {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    
    if (softDelete) {
      comment.deletedAt = new Date();
      await this.commentRepository.save(comment);
    } else {
     
      await this.commentRepository.delete(id);
    }
  }
  

}