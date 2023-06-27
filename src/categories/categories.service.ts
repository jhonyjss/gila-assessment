import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepo?: Repository<Categories>,
  ) {}

  async findAll(): Promise<Categories[]> {
    const categories = await this.categoriesRepo.find();
    if (!categories) {
      throw new NotFoundException('Not found any category');
    }
    return categories;
  }
}
