import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'offer_id',
  })
  offerId: string;

  @Column({
    name: 'start_date',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
  })
  endDate: Date;
}
