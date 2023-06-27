import { Factory, Seeder } from 'typeorm-seeding';
import { Categories } from '../src/categories/entities/categories.entity';
import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig';
const dataSource = new DataSource(ormconfig);

export default class CreateCategories implements Seeder {
  public async run(_factory: Factory): Promise<any> {
    return dataSource
      .initialize()
      .then(async () => {
        console.log('Data Source has been initialized!');
        // const repository = dataSource.getRepository(Categories);
        // now you can call repository methods, for example find:
        return dataSource
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values([{ name: 'Sports' }, { name: 'Finance' }, { name: 'Movies' }])
          .execute();
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    // return await datasource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Categories)
    //   .values([{ name: 'Sports' }, { name: 'Finance' }, { name: 'Movies' }])
    //   .execute();
  }
}
