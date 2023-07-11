import { CreateLogsDto } from './dto/create-log.dto';
import { Logs } from '../logs/entities/logs.entity';
import { LogsService } from './logs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});
describe('LogsService', () => {
  let logService: LogsService;
  let logRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getRepositoryToken(Logs),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    logService = module.get<LogsService>(LogsService);
    logRepository = module.get<MockRepository>(getRepositoryToken(Logs));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockLogs = [
        { id: 1, message: 'Log 1' },
        { id: 2, message: 'Log 2' },
      ];
      jest.spyOn(logRepository, 'find').mockResolvedValue(mockLogs);

      const result = await logService.findAll();

      expect(result).toEqual(mockLogs);
      expect(logRepository.find).toHaveBeenCalled();
    });

    it('should throw the "HttpException"', async () => {
      const errorMessage = 'log not created';
      jest
        .spyOn(logRepository, 'find')
        .mockRejectedValue(new Error(errorMessage));

      await expect(logService.findAll()).rejects.toThrowError(
        new HttpException({ message: errorMessage }, HttpStatus.BAD_REQUEST),
      );
      expect(logRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createLogsDto: CreateLogsDto = {
        message: 'My message',
        usersId: 1,
        categoriesId: 1, // Provide a value for notifications
        notificationsId: 1,
      };
      const createdLogs = {
        id: 1,
        ...createLogsDto,
      };

      logRepository.create.mockReturnValue(createdLogs);
      logRepository.save.mockResolvedValue(createdLogs);

      const result = await logService.create(createLogsDto);

      expect(result).toEqual({ message: 'created' });
      expect(logRepository.create).toHaveBeenCalledWith(createLogsDto);
      expect(logRepository.save).toHaveBeenCalledWith(createdLogs);
    });
  });
});
