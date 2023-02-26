import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { Client } from 'pg';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
// variables de entorno
import { enviroments } from 'enviroments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

const client = new Client({
  user: 'kenny',
  host: 'localhost',
  database: 'my_db',
  password: 'postgres',
  port: 5432,
});
//coneccions
client.connect();
client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
});

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      //establecer variable de entorno a usar sino .env por defecto
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
