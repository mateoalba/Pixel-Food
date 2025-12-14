import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './plato.entity';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { Categoria } from 'src/categoria/categoria.entity';

@Injectable()
export class PlatoService {
  constructor(
    @InjectRepository(Plato)
    private platoRepo: Repository<Plato>,

    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreatePlatoDto) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id_categoria: dto.id_categoria },
    });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const plato = this.platoRepo.create({
      ...dto,
      categoria: categoria,
    });

    return this.platoRepo.save(plato);
  }

  async findAll() {
    return this.platoRepo.find({ relations: ['categoria'] });
  }

  async findOne(id: number) {
    const plato = await this.platoRepo.findOne({
      where: { id_plato: id },
      relations: ['categoria'],
    });

    if (!plato) throw new NotFoundException('Plato no encontrado');

    return plato;
  }

  async update(id: number, dto: UpdatePlatoDto) {
    const plato = await this.findOne(id);

    if (dto.id_categoria) {
      const categoria = await this.categoriaRepo.findOne({
        where: { id_categoria: dto.id_categoria },
      });

      if (!categoria) throw new NotFoundException('Categoría no encontrada');

      plato.categoria = categoria;
    }

    Object.assign(plato, dto);
    return this.platoRepo.save(plato);
  }

  async remove(id: number) {
    const plato = await this.findOne(id);
    await this.platoRepo.remove(plato);
    return plato;
  }
}
