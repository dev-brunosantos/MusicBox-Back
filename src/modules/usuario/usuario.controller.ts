import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  
  @Post()
  public async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  public async findAll() {
    return await this.usuarioService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.usuarioService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('/email')
  public async findByEmail(@Body('email') email: string) {
    return await this.usuarioService.findByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.usuarioService.remove(id);
  }
}
