import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('plato')
@UseGuards(JwtAuthGuard)
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Post()
  create(@Body() dto: CreatePlatoDto) {
    return this.platoService.create(dto);
  }

  @Get()
  findAll() {
    return this.platoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.platoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePlatoDto) {
    return this.platoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.platoService.remove(id);
  }
}
