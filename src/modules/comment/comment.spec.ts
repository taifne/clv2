import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  describe('create', () => {
    it('should create a comment', async () => {
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment content',
        postId: 1,
        userId: 1,
      };

      const createdComment = {
        id: 1,
        content: 'Test comment content',
        postId: 1,
        userId: 1,
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(createdComment as any);

      const result = await controller.create(createCommentDto);
      expect(result).toBe(createdComment);
    });

    it('should throw an error if creation fails', async () => {
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment content',
        postId: 1,
        userId: 1,
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Creation failed'));

      await expect(controller.create(createCommentDto)).rejects.toThrowError('Creation failed');
    });
  });
});
