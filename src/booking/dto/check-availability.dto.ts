import { IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckAvailabilityDto {
  @IsNotEmpty()
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
