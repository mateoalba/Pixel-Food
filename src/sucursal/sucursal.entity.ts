import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mesa } from 'src/mesa/mesa.entity';

@Entity('sucursal')
export class Sucursal {
  @PrimaryGeneratedColumn()
  id_sucursal: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @OneToMany(() => Mesa, (mesa) => mesa.sucursal)
  mesas: Mesa[];
}
