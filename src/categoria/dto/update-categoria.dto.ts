import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;
}
