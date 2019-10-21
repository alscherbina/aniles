import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Country {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @OneToMany(type => Location, location => location.country)
  locations: Location[];
}
