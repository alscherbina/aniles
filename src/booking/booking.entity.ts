import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({ example: '43756686' })
  id: string;

  @Column({
    name: 'offer_id',
  })
  @ApiModelProperty({ example: '56643' })
  offerId: string;

  @Column({
    name: 'start_date',
  })
  @ApiModelProperty({ format: 'YYYY-MM-DD', example: '2019-11-01' })
  startDate: Date;

  @Column({
    name: 'end_date',
  })
  @ApiModelProperty({ format: 'YYYY-MM-DD', example: '2019-11-01' })
  endDate: Date;
}
