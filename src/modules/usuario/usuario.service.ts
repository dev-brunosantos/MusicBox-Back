import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DbService } from 'src/db/db.service';
import { hash } from "bcrypt";

@Injectable()
export class UsuarioService {

  constructor(private prisma: DbService) { }

  public async create(createUsuarioDto: CreateUsuarioDto) {

    const emailExists = await this.findByEmail(createUsuarioDto.email);

    if (emailExists) {
      throw new HttpException(
        "O e-mail informado já está vinculado a um outro usuário do sistema.",
        HttpStatus.CONFLICT
      );
    }

    const newPassword = await hash(createUsuarioDto.senha, 10);

    const newUser = await this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senha: newPassword,
        cargo: 'Aluno'
      }
    })

    return newUser;
  }

  public async findAll() {
    const users = await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true,
        // Depois deve-se adicionar a data de cadastro
      }
    })

    if (!users || users.length == 0) {
      throw new HttpException("Nenhum usuário cadastrado no sistema", HttpStatus.NOT_FOUND);
    }

    return users;
  }

  public async findOne(id: string) {
    return await this.prisma.usuario.findFirst({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true,
        // Depois deve-se adicionar a data de cadastro
      }
    })
  }

  public async findByEmail(email: string) {
    return await this.prisma.usuario.findUnique({
      where: { email }
    })
  }

  public async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const userID = await this.prisma.usuario.findFirst({
      where: { id }
    })

    if (!userID) {
      throw new HttpException("O ID informado não esta vinculado a nenhum usuário cadastrado no sistema", HttpStatus.NOT_FOUND);
    }

    let password = userID.senha;
    if (updateUsuarioDto.senha) {
      password = await hash(updateUsuarioDto.senha!, 10);
    }

    const userUpdate = await this.prisma.usuario.update({
      where: { id },
      data: {
        nome: updateUsuarioDto.nome ?? userID.nome,
        cargo: updateUsuarioDto.cargo ?? userID.cargo,
        senha: password
      }
    })

    return {
      antes: userID,
      depois: userUpdate
    }
  }

  public async remove(id: string) {
    const userID = await this.findOne(id);

    if (!userID) {
      throw new HttpException("O ID informado não esta vinculado a nenhum usuário cadastrado no sistema", HttpStatus.NOT_FOUND);
    }

    await this.prisma.usuario.delete({
      where: { id }
    })

    return `Os dados do usuário ${userID.nome.toUpperCase()} foram excluídos com sucesso.`
  }
}
