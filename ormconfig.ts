import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const config: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'mariadb',
  port: 3306,
  username: 'gila',
  password: 'gila',
  database: 'gilaDB',
  entities: ['dist/**/*.entity{.ts,.js}'],
  seeds: ['dist/seeds/**/*.js'],
  factories: ['dist/factories/**/*.js'],
  synchronize: true,
};

export default config;
