import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Plato } from 'src/plato/plato.entity';
import { Ingrediente } from 'src/ingrediente/ingrediente.entity';

@Entity('receta')
export class Receta {
  @PrimaryGeneratedColumn()
  id_receta: number;

  @ManyToOne(() => Plato, plato => plato.recetas, {
    onDelete: 'CASCADE',
  })
  plato: Plato;

  @ManyToOne(() => Ingrediente, ingrediente => ingrediente.recetas, {
    onDelete: 'CASCADE',
  })
  ingrediente: Ingrediente;

  @Column('decimal')
  cantidad: number;
}
