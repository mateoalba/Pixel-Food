import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingrediente } from './ingrediente.entity';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Injectable()
export class IngredienteService {
  constructor(
    @InjectRepository(Ingrediente)
    private ingredienteRepo: Repository<Ingrediente>,
  ) {}

  create(dto: CreateIngredienteDto) {
    const nuevo = this.ingredienteRepo.create(dto);
    return this.ingredienteRepo.save(nuevo);
  }

  findAll() {
    return this.ingredienteRepo.find();
  }

  async findOne(id: number) {
    const ingrediente = await this.ingredienteRepo.findOne({
      where: { id_ingrediente: id },
    });

    if (!ingrediente) throw new NotFoundException('Ingrediente no encontrado');
    return ingrediente;
  }

  async update(id: number, dto: UpdateIngredienteDto) {
    const ingrediente = await this.findOne(id);
    Object.assign(ingrediente, dto);
    return this.ingredienteRepo.save(ingrediente);
  }

  async remove(id: number) {
    const ingrediente = await this.findOne(id);
    await this.ingredienteRepo.remove(ingrediente);
    return ingrediente;
  }
}
