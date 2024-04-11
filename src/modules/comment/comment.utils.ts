import { DeepPartial } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';

export function mapCreateCommentDtoToEntity(dto: CreateCommentDto): DeepPartial<Comment> {
  return {
    content: dto.content,
    parentId: dto.parentId,
    
    post:  dto.postId ,
    user:  dto.userId ,
  };
}
