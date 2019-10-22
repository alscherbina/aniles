import { IsNotEmpty, IsDate, IsUUID, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckAvailabilityDto {
  @IsNotEmpty()
  @IsUUID()
  readonly locationId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly dateStart: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly dateEnd: Date;
}

export class CheckAvailabilityRO {
  constructor(readonly offerId: number, readonly offerType: string, readonly available: number) {};
}
