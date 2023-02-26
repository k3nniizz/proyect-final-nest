import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

import { ProductsModule } from '../products/products.module';

@Module({
  //importa modulo pruduct para ocupar product service.
  imports: [ProductsModule],
  providers: [UsersService, CustomersService],
  controllers: [CustomersController, UsersController],
})
export class UsersModule {}
