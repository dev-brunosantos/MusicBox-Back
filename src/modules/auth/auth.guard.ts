import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from "express";
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwt : JwtService,
    private prisma : DbService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.split(' ')[1];

    if(!token) {
      throw new UnauthorizedException("Token não encontrado."); 
    }
    
    try {
      const payload = await this.jwt.verify(token, { algorithms: ['HS256']});
      // Pegando o usuário e adicionando na request
      const user = await this.prisma.usuario.findUnique({
        where: { id: payload.sub }
      })

      if(!user) {
        throw new UnauthorizedException("Usuário não encontrado.")
      }

      request.user = user;

      return true;
      
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException("Token inválido.", { cause: error }); 

    }

  }
}
