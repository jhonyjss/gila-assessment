import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUsersDto } from './dto/create.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});
describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockLogs = [
        { id: 1, message: 'Log 1' },
        { id: 2, message: 'Log 2' },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockLogs);

      const result = await userService.findAll();

      expect(result).toEqual(mockLogs);
      expect(userRepository.find).toHaveBeenCalled();
    });

    it('should throw the "HttpException"', async () => {
      const errorMessage = 'Error occurred';
      jest
        .spyOn(userRepository, 'find')
        .mockRejectedValue(new Error(errorMessage));

      await expect(userService.findAll()).rejects.toThrowError(
        new HttpException({ message: errorMessage }, HttpStatus.BAD_REQUEST),
      );
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUsersDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
      };
      const createdUser = {
        id: 1,
        ...createUserDto,
      };

      userRepository.create.mockReturnValue(createdUser);
      userRepository.save.mockResolvedValue(createdUser);

      const result = await userService.create(createUserDto);

      expect(result).toEqual({ message: 'created' });
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(createdUser);
    });
  });
});
