import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig';
import { User } from 'src/users/entities/user.entity';
const dataSource = new DataSource(ormconfig);

export default class CreateUsers implements Seeder {
  public async run(_factory: Factory): Promise<any> {
    return dataSource
      .initialize()
      .then(async () => {
        console.log('Data Source has been initialized!');
        // const repository = dataSource.getRepository(Users);
        // now you can call repository methods, for example find:
        return dataSource
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
            {
              name: 'Anthony Sou',
              email: 'anthony@gmail.com',
              phone_number: '551199999999',
            },
            {
              name: 'Henry Sou',
              email: 'henry@gmail.com',
              phone_number: '552299999999',
            },
            {
              name: 'Jhony Sou',
              email: 'jhony@gmail.com',
              phone_number: '553399999999',
            },
          ])
          .execute();
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }
}
