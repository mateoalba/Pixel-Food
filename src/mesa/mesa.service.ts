import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from './mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Sucursal } from 'src/sucursal/sucursal.entity';

@Injectable()
export class MesaService {
  constructor(
    @InjectRepository(Mesa)
    private mesaRepo: Repository<Mesa>,

    @InjectRepository(Sucursal)
    private sucursalRepo: Repository<Sucursal>,
  ) {}

  async create(dto: CreateMesaDto) {
    const sucursal = await this.sucursalRepo.findOne({
      where: { id_sucursal: dto.id_sucursal },
    });

    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    const nueva = this.mesaRepo.create({
      numero: dto.numero,
      capacidad: dto.capacidad,
      estado: dto.estado,
      sucursal,
    });

    return await this.mesaRepo.save(nueva);
  }

  async findAll() {
    return this.mesaRepo.find({ relations: ['sucursal'] });
  }

  async findOne(id: number) {
    const mesa = await this.mesaRepo.findOne({
      where: { id_mesa: id },
      relations: ['sucursal'],
    });

    if (!mesa) throw new NotFoundException('Mesa no encontrada');
    return mesa;
  }

  async update(id: number, dto: UpdateMesaDto) {
    const mesa = await this.findOne(id);

    Object.assign(mesa, dto);
    return this.mesaRepo.save(mesa);
  }

  async remove(id: number) {
    const mesa = await this.findOne(id);
    return this.mesaRepo.remove(mesa);
  }
}
