import { IsNotEmpty, IsDate, IsUUID, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsBeforeConstraint } from '../../shared/validation/is-date-before.contstraint';
import { ApiModelProperty } from '@nestjs/swagger';

export class CheckAvailabilityDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiModelProperty({ format: 'UUID', example: '5f3543ae-3958-4966-b465-64715a8d0faf' })
  readonly locationId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Validate(IsBeforeConstraint, ['endDate'])
  @ApiModelProperty({ format: 'YYYY-MM-DD', example: '2019-11-01' })
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiModelProperty({ format: 'YYYY-MM-DD', example: '2019-11-15' })
  readonly endDate: Date;
}

export class CheckAvailabilityRO {
  @ApiModelProperty({ example: 34 })
  readonly offerId: number;
  @ApiModelProperty({ example: 'Dorm' })
  readonly offerType: string;
  @ApiModelProperty({ example: 7 })
  readonly available: number;

  constructor(offerId: number, offerType: string, available: number) {
    this.offerId = offerId;
    this.offerType = offerType;
    this.available = available;
  }
}
