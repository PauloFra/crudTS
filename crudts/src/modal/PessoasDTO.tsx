export interface PessoasDTO{
    pessoas:{
        cpf: string;
        dataNascimento: string;
        email: string,
        idPessoa: number,
        nome: string
        contatosList?:object
    }[]
}



// export interface PeopleDTO {
//     people:{
//         nome: string
//         idade: number
//         url?:string
//         note?:string
//       }[]
// }