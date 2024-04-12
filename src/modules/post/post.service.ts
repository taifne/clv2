import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@/modules/post/post.entity';
import { CreatePostDto } from '@/modules/post/dto/create-post-dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async create(post: CreatePostDto): Promise<Post> {
    return this.postRepository.save(post);
  }
}
