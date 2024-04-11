import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  parentId?: number;
}