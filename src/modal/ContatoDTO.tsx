export interface EnderecoDTO {
    cep: string;
    logradouro: string;
    localidade: string;
    complemento:string;
    uf: string;
    pais: string;
    tipo: string;
    numero: string
}

export interface EnderecoSwaggerDTO {
    idEndereco?: string;
    tipo: string;
    numero: number;
    complemento: string;
    logradouro: string;
    cep:string;
    cidade: string;
    estado: string;
    pais: string;
}
  