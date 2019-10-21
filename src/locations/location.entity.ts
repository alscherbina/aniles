import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class Location {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(type => Country, country => country.locations, { eager: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
