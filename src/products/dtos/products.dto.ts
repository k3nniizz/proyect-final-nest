//valida datos en produccion(integrar en main.ts) con sus decoradores.
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';
// ayuda a resicar codigo permitiendo tomar las vaidaciones de la clase createproduct y extenderla
// de forma opcional en update product
import { PartialType } from '@nestjs/swagger';

//valida datos en desarrollo
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
}
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
