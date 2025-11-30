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

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepo.create(createCategoriaDto);
    return await this.categoriaRepo.save(categoria);
  }

  findAll() {
    return this.categoriaRepo.find();
  }

  async findOne(id: string) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id_categoria: id },
    });

    if (!categoria) {
      throw new NotFoundException(`No existe la categoría con ID: ${id}`);
    }

    return categoria;
  }

  async updatePut(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);

    categoria.nombre = updateCategoriaDto.nombre;
    categoria.descripcion = updateCategoriaDto.descripcion;

    return this.categoriaRepo.save(categoria);
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);

    Object.assign(categoria, updateCategoriaDto);

    return this.categoriaRepo.save(categoria);
  }

async remove(id: string) {
  const categoria = await this.findOne(id);
  await this.categoriaRepo.delete(id);
  return categoria;
}

}
