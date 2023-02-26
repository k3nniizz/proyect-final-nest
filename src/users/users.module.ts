import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  //importa modulo pruduct para ocupar product service.
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  providers: [UsersService, CustomersService],
  controllers: [CustomersController, UsersController],
})
export class UsersModule {}
