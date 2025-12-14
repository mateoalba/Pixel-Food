import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreatePlatoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsBoolean()
  disponible: boolean;

  @IsNumber()
  id_categoria: number;
}
