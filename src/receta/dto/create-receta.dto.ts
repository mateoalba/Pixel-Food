import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecetaDto {
  @IsNumber()
  @IsNotEmpty()
  id_plato: number;

  @IsNumber()
  @IsNotEmpty()
  id_ingrediente: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;
}
