import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    nome?: string | undefined;
    senha?: string | undefined;
    cargo?: 'Aluno' | 'Professor' | 'Dev' | undefined;
}
