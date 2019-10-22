import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryColumn()
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