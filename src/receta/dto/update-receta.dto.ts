import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateRecetaDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id_plato?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  id_ingrediente?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cantidad?: number;
}
