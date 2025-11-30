import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
  ) {}

  create(dto: CreateRolDto) {
    const nuevo = this.rolRepo.create(dto);
    return this.rolRepo.save(nuevo);
  }

  findAll() {
    return this.rolRepo.find();
  }

async findOne(id: string) {
  const rol = await this.rolRepo.findOne({ where: { id_rol: id } });

  if (!rol) {
    throw new NotFoundException(`No existe el rol con ID: ${id}`);
  }

  return rol;
}

async updatePut(id: string, updateRolDto: UpdateRolDto) {
  const rol = await this.findOne(id);

  rol.nombre = updateRolDto.nombre;
  rol.descripcion = updateRolDto.descripcion;

  return await this.rolRepo.save(rol);
}

  async remove(id: string) {
    const rol = await this.findOne(id);
    await this.rolRepo.remove(rol);

    return {
      message: 'Rol eliminado correctamente',
      eliminado: rol,
    };
  }
}
