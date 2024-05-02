import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UserService', () => {
    let service: UserService;
    let userRepositoryMock: any;

    beforeEach(async () => {

        userRepositoryMock = {
            find: jest.fn(),
            findOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUsers = [{ id: 1, username: 'user1', email: 'user1@example.com' }];
            userRepositoryMock.find.mockResolvedValue(mockUsers);

            const users = await service.findAll();
            console.log(users);
            expect(users).toEqual(mockUsers);
            expect(userRepositoryMock.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a user by id', async () => {
            const userId = 1;
            const mockUser = { id: userId, username: 'user1', email: 'user1@example.com' };
            userRepositoryMock.findOne.mockResolvedValue(mockUser);

            const user = await service.findOne(userId);

            expect(user).toEqual(mockUser);
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith(userId);
        });

        it('should return undefined if user not found', async () => {
            const userId = 999;
            userRepositoryMock.findOne.mockResolvedValue(undefined);

            const user = await service.findOne(userId);

            expect(user).toBeUndefined();
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith(userId);
        });
    });
});
