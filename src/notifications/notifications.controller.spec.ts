import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './entities/notifications.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
});
describe('CategoriesController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;
  let notificationsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notifications),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Notifications),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
    notificationsRepository = module.get<MockRepository>(
      getRepositoryToken(Notifications),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute findAll notifications', () => {
    it('should return an array of notifications', async () => {
      const notifications = [
        { id: 1, name: 'SMS' },
        { id: 2, name: 'E-mail' },
        { id: 3, name: 'Push Notification' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(notifications);

      const result = await controller.findAll();

      expect(result).toEqual(notifications);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw the "NotFoundException"', async () => {
      notificationsRepository.find.mockReturnValue(undefined);
      try {
        await service.findAll();
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Not found any notifications`);
      }
    });
  });
});
