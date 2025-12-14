import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('recetas')
@UseGuards(JwtAuthGuard)
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  create(@Body() dto: CreateRecetaDto) {
    return this.recetaService.create(dto);
  }

  @Get()
  findAll() {
    return this.recetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recetaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRecetaDto) {
    return this.recetaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recetaService.remove(id);
  }
}
