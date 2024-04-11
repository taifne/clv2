import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength,MaxLength,Matches } from 'class-validator';

import { lowerCaseTransformer } from '../../../untils/transformers/lower-case.transformer';

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
        message: 'Username must contain only letters, numbers, and underscores'
    })
    username: string;
}