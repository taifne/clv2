import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ example: 'This is an updated comment' })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @ApiProperty({ example: 123 })
  @IsOptional()
  parentId?: number;
}
