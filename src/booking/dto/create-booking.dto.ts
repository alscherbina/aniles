import { IsNotEmpty, IsDate, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsBeforeConstraint } from '../../shared/validation/is-date-before.contstraint';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateBookingDto {
  @IsNotEmpty()
  @ApiModelProperty({ example: '56643' })
  readonly offerId: string;

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
