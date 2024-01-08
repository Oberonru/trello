import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './user/user.entity';

const ormconfig: DataSourceOptions = {
  database: 'trelloDb',
  type: 'postgres',
  host: 'localhost',
  username: 'user',
  port: 5432,
  password: '123',
  entities: [UserEntity],
  synchronize: true,
};

export default ormconfig;
