import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  location_id: string;

  @Column()
  offer_type: string;

  @Column("money")
  price: string;

  @Column()
  qty: number;
}