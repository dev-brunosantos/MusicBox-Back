// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUsuarioDto } from './create-usuario.dto';
import { Cargo } from 'src/generated/prisma/enums';
import { IsEnum, IsOptional, IsString, MinLength, minLength } from 'class-validator';


// export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    nome?: string | undefined;

    @IsOptional()
    @IsString()
    // @MinLength(6, { message: "A quantidade mínima de caracteres é igual a 6." })
    senha: string | undefined;

    @IsOptional()
    @IsEnum(Cargo)
    cargo: Cargo;
}
