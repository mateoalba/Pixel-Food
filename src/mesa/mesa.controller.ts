import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('mesa')
@UseGuards(JwtAuthGuard)
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  create(@Body() dto: CreateMesaDto) {
    return this.mesaService.create(dto);
  }

  @Get()
  findAll() {
    return this.mesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mesaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMesaDto) {
    return this.mesaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mesaService.remove(id);
  }
}
