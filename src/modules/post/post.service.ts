import { Injectable, NotFoundException } from '@nestjs/common';
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
    const posts = await this.postRepository
    .createQueryBuilder('post')
    .select('post')
    .groupBy('post.title,post.id') // Grouping by title
    .having('COUNT(post.title) > 0') // Having more than one comment
    .orderBy('post.created_at', 'DESC') // Ordering by created_at in descending order
    .getMany();

return posts;
   
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({where:{id:id}});

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(post: CreatePostDto): Promise<Post> {
    return this.postRepository.save(post);
  }
}
