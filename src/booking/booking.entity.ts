import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  offer_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}