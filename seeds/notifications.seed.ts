import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { Notifications } from '../src/notifications/entities/notifications.entity';
import ormconfig from '../ormconfig';
const dataSource = new DataSource(ormconfig);

export default class CreateNotifications implements Seeder {
  public async run(_factory: Factory): Promise<any> {
    return dataSource
      .initialize()
      .then(async () => {
        return dataSource
          .createQueryBuilder()
          .insert()
          .into(Notifications)
          .values([
            { name: 'SMS' },
            { name: 'E-mail' },
            { name: 'Push Notification' },
          ])
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
