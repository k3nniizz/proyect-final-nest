import { Module } from '@nestjs/common';

import { Client } from 'pg';

const client = new Client({
  user: 'kenny',
  host: 'localhost',
  database: 'my_db',
  password: 'postgres',
  port: 5432,
});

client.connect();
client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
});

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
