import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from './sucursal.entity';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@Injectable()
export class SucursalService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(dto: CreateSucursalDto): Promise<Sucursal> {
    const sucursal = this.sucursalRepository.create(dto);
    return await this.sucursalRepository.save(sucursal);
  }

  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalRepository.find();
  }

  async findOne(id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOne({
      where: { id_sucursal: id },
    });

    if (!sucursal) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }

    return sucursal;
  }

  async update(id: number, dto: UpdateSucursalDto): Promise<Sucursal> {
    const sucursal = await this.findOne(id);
    Object.assign(sucursal, dto);
    return this.sucursalRepository.save(sucursal);
  }

  async remove(id: number): Promise<void> {
    const sucursal = await this.findOne(id);
    await this.sucursalRepository.remove(sucursal);
  }
}
