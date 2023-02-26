import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDTO) {
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    const newProduct = this.productRepo.create(data);

    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productRepo.findOne({ where: { id: id } });
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
