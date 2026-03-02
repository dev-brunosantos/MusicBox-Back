import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { compare } from "bcrypt";

@Injectable()
export class AuthService {

  constructor(
    private usuarioService: UsuarioService,
    private jwt: JwtService
  ) { }

  public async signIn(loginDto: LoginAuthDto) {
    const user = await this.usuarioService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas.");
    }

    const password = await compare(loginDto.senha, user.senha)

    if (!password) {
      throw new UnauthorizedException("Não autorizado");
    }

    const payload = {
      sub: user.id, nome: user.nome, cargo: user.cargo
    }

    return {
      access_token: await this.jwt.signAsync(payload)
    }
  }
}
