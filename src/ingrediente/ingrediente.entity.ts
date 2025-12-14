import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Receta } from 'src/receta/receta.entity';

@Entity('ingrediente')
export class Ingrediente {
  @PrimaryGeneratedColumn()
  id_ingrediente: number;

  @Column()
  nombre: string;

  @Column()
  unidad_medida: string;

  @Column('decimal', { precision: 10, scale: 2 })
  stock: number;

  @OneToMany(() => Receta, receta => receta.ingrediente)
  recetas: Receta[];
}
