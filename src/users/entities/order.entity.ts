import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Entity } from 'typeorm';

@Entity()
export class Order {
  date: Date;
  user: User;
  products: Product[];
}
