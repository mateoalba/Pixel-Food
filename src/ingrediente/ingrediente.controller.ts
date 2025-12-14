import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ingrediente')
@UseGuards(JwtAuthGuard)
export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) {}

  @Post()
  create(@Body() dto: CreateIngredienteDto) {
    return this.ingredienteService.create(dto);
  }

  @Get()
  findAll() {
    return this.ingredienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredienteService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIngredienteDto) {
    return this.ingredienteService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredienteService.remove(Number(id));
  }
}
