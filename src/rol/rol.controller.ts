import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() dto: CreateRolDto) {
    return this.rolService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(id);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() dto: UpdateRolDto) {
    return this.rolService.updatePut(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(id);
  }
}
