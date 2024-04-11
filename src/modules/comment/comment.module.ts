import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,User,Post])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
