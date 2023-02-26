import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newcustomer = this.customerRepo.create(data);

    return this.customerRepo.save(newcustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne({ where: { id: id } });
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }
  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
