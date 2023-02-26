import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private clientPg: Client) {}
  getHello(): string {
    return 'Hello World!';
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
