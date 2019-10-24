import { IsNotEmpty, IsDate, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsBeforeConstraint } from '../../shared/validation/is-date-before.contstraint';
export class CreateBookingDto {
  @IsNotEmpty()
  readonly offerId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Validate(IsBeforeConstraint, ['endDate'])
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;
}
