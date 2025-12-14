import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto) {
    const nueva = this.categoriaRepo.create(dto);
    return await this.categoriaRepo.save(nueva);
  }

  async findAll() {
    return this.categoriaRepo.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id_categoria: id },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);

    Object.assign(categoria, dto);
    return await this.categoriaRepo.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    await this.categoriaRepo.remove(categoria);
    return categoria;
  }
}
