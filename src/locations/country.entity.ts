import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  locations: Location[];
}
