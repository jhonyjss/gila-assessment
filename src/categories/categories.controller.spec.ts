import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entities/categories.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
});
describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  let categoriesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Categories),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Categories),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<MockRepository>(
      getRepositoryToken(Categories),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Execute findAll categories', () => {
    it('should return an array of categories', async () => {
      const categories = [
        { id: 1, name: 'Sports' },
        { id: 2, name: 'Finance' },
        { id: 3, name: 'Movies' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(result).toEqual(categories);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw the "NotFoundException"', async () => {
      categoriesRepository.find.mockReturnValue(undefined);
      try {
        await service.findAll();
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Not found any category`);
      }
    });
  });
});
