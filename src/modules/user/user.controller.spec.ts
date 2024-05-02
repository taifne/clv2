import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/user/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          username: 'john_doe',
          email: 'john@example.com',
          comments: [],
          createdAt: new Date(),
        },
        {
          id: 2,
          username: 'jane_doe',
          email: 'jane@example.com',
          comments: [],
          createdAt: new Date(),
        },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);
      
      expect(await controller.findAll()).toBe(users);
    });
  });

});
