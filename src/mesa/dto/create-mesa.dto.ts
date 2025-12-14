import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateMesaDto {
  @IsInt()
  numero: number;

  @IsInt()
  capacidad: number;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsInt()
  id_sucursal: number;
}
