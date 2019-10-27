import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'location_id',
  })
  locationId: string;

  @Column({
    name: 'offer_type',
  })
  offerType: string;

  @Column()
  price: string;

  @Column()
  qty: number;
}
