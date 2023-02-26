import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

// const client = new Client({
//   user: 'kenny',
//   host: 'localhost',
//   database: 'my_db',
//   password: 'postgres',
//   port: 5432,
// });
//coneccions
// client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  imports: [
    //coneccion de typeorm la hace por interno, despues generar entidades
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        // client.connect();
        // return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
