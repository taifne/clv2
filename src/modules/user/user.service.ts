import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const users = await this.userRepository.find();
        resolve(users);
      }, 1000); 
    });
  }
  
  async findOne(id: any): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async update(id: any, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      return undefined;
    }
    await this.userRepository.update(id, userData);
    return await this.userRepository.findOne(id);
  }

  async remove(id: any): Promise<void> {
    await this.userRepository.delete(id);
  }
}
