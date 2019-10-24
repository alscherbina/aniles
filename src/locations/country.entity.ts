import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { Location } from './location.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Country {
  @PrimaryColumn()
  @ApiModelProperty({ example: 'gt' })
  id: string;

  @Column()
  @ApiModelProperty({example: 'Guatemala'})
  title: string;

  @OneToMany(type => Location, location => location.country)
  locations: Location[];
}
