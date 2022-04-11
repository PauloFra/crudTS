export function MaskCpf(cep:string){
    return cep.slice(0,5) + "-" + cep.slice(5,8)
}
export const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};