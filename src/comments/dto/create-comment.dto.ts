import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  parentId: number;

  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  userId: number;
}