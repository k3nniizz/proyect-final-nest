import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { environments } from '../enviroments';

dotenv.config({
  path: environments[process.env.NODE_ENV] || '.env',
});

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/products/entities/product.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
PostgresDataSource.initialize();

export default PostgresDataSource;
