import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'JohnDoe_123' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username must contain only letters, numbers, and underscores',
  })
  username: string;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Age must be a positive integer' })
  age?: number;
}
