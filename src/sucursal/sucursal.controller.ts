import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards,} from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sucursales')
@UseGuards(JwtAuthGuard)
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Post()
  create(@Body() dto: CreateSucursalDto) {
    return this.sucursalService.create(dto);
  }

  @Get()
  findAll() {
    return this.sucursalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sucursalService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSucursalDto) {
    return this.sucursalService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sucursalService.remove(Number(id));
  }
}
