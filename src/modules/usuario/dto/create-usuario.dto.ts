import { IsEnum, IsString, MinLength } from "class-validator";


export class CreateUsuarioDto {
    // id: string;
    @IsString({message: "O dado informado não é válido."})
    nome: string;
    
    @IsString({message: "O e-mail informado não é válido."})
    email: string;

    @IsString({message: "O e-mail informado não é válido."})
    @MinLength(6, { message: "A quantidade mínima de caracteres é igual a 6. Tente uma nova senha."})
    senha: string;

    @IsEnum(['Aluno', 'Professor', 'Dev'], { message: "O cargo informado não é válido."})
    cargo: 'Aluno' | 'Professor' | 'Dev'
}
