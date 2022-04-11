export interface PessoaDTO{
        nome: string
        email: string,
        cpf: string,
        dataNascimento: string,       
        idPessoa?: number,
        contatosList?:object | null
}
