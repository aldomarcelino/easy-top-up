import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateHistoryDto {
  @IsNotEmpty()
  @IsString()
  readonly method: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsString()
  readonly note: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
