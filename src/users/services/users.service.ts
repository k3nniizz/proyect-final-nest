import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { ConfigService } from '@nestjs/config';
import { Console } from 'console';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newuser = this.userRepo.create(data);

    return this.userRepo.save(newuser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }
  remove(id: number) {
    return this.userRepo.delete(id);
  }
  // requiere exportacion de product service
  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  // getTasks() {
  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(res.rows);
  //     });
  //   });
  // }
}
