import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class MovementDto {
  @IsEnum(['income', 'expense'])
  @IsNotEmpty()
  type: 'income' | 'expense';

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}
