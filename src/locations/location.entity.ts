import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Location {
  @PrimaryColumn()
  @ApiModelProperty({ format: 'UUID', example: '5f3543ae-3958-4966-b465-64715a8d0faf' })
  id: string;

  @Column()
  @ApiModelProperty({ example: 'Antigua' })
  title: string;

  @ManyToOne(type => Country, country => country.locations, { eager: true })
  @JoinColumn({ name: 'country_id' })
  @ApiModelProperty()
  country: Country;
}
