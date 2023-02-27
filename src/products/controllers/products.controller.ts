import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  //codigos de problemas
  HttpStatus,
  HttpCode,
  Res,
  //parsear un dato
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';

//ruta controlador
@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private productsServices: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAll() {
    return this.productsServices.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsServices.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productsServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsServices.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsServices.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  detele(@Param('id', ParseIntPipe) id: number) {
    return this.productsServices.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deteleCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsServices.removeCategoryByProduct(id, categoryId);
  }
}
