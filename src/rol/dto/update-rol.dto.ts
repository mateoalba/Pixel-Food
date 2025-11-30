import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRolDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
