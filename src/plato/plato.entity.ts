import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
import { Receta } from 'src/receta/receta.entity';

@Entity('plato')
export class Plato {
  @PrimaryGeneratedColumn()
  id_plato: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column()
  disponible: boolean;

  @ManyToOne(() => Categoria, categoria => categoria.platos, {
    onDelete: 'SET NULL',
  })
  categoria: Categoria;

  @OneToMany(() => Receta, receta => receta.plato)
  recetas: Receta[];
}
