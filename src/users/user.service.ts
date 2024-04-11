import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: any): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async create(userData: Partial<User>): Promise<User> {
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