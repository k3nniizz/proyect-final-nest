//valida datos en produccion(integrar en main.ts) con sus decoradores.
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
  IsArray,
} from 'class-validator';
// ayuda a resicar codigo permitiendo tomar las vaidaciones de la clase createproduct y extenderla
// de forma opcional en update product
import { PartialType, ApiProperty } from '@nestjs/swagger';

//valida datos en desarrollo
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
