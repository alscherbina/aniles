import { IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsNotEmpty()
  readonly offerId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;
}

export class CreateBookingRO {
  constructor(
    readonly id: number,
    readonly offer_id: number,
    readonly start_date: string,
    readonly end_date: string,
  ) {}
}
