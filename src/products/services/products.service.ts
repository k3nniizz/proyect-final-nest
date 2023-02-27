import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    const newProduct = this.productRepo.create(data);

    //resolver brand
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });

      newProduct.brand = brand;
    }

    //resolver categorias
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.find({
        where: data.categoriesIds.map((categoryId) => ({ id: categoryId })),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productRepo.findOne({ where: { id: id } });
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.find({
        where: changes.categoriesIds.map((categoryId) => ({ id: categoryId })),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoriesId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter((item) => {
      return item.id !== categoriesId;
    });
    return this.productRepo.save(product);
  }
  // splice
  // async removeCategoryByProduct(productId: number, categoryId: number) {
  //   const product = await this.productRepo.findOne({
  //     where: { id: productId },
  //     relations: ['categories'],
  //   });
  //   const categoryIndex = product.categories.findIndex(
  //     (item) => item.id === categoryId,
  //   );
  //   if (categoryIndex !== -1) {
  //     product.categories.splice(categoryIndex, 1);
  //     return this.productRepo.save(product);
  //   } else {
  //     return product;
  //   }
  // }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
