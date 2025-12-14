import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sucursal } from 'src/sucursal/sucursal.entity';

@Entity('mesa')
export class Mesa {
  @PrimaryGeneratedColumn()
  id_mesa: number;

  @Column()
  numero: number;

  @Column()
  capacidad: number;

  @Column()
  estado: string;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.mesas, {
    onDelete: 'CASCADE',
  })
  sucursal: Sucursal;
}
