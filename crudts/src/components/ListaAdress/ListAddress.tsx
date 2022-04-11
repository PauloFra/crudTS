import {useContext , useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import style from '../../CommunCss/tableList.module.css'
import { MaskCpf } from '../../Utils';
import { EnderecoDTO } from '../../modal/ContatoDTO';
import SubHeader from '../SubHeader/SubHeader';
import { EnderecoSwaggerDTO } from '../../modal/ContatoDTO';
import api from '../../api';
import Loading from '../Loading/Loading';
import Notiflix from 'notiflix';
import { 
  IoMdTrash,
  IoIosColorWand,
  IoMdFunnel,
  IoMdReturnLeft
} from "react-icons/io";
function ListAddress() {
  const {arrayEndereço ,getInEndereço , setObjEndereco} = useContext<any>(AuthContext)
  
  useEffect(()=>{
    getInEndereço()   
  },[])
  
  function setEndereco(values:EnderecoDTO){
    setObjEndereco(values)
  }

  const removeEndereco = (values:EnderecoSwaggerDTO) => {
    Notiflix.Confirm.show(
        'Excluir Endereço',
        `Tem certeza que deseja excluir a ${values.logradouro} da cidade de ${values.cidade} da lista de endereço ?`,
        'Sim',
        'Não',
        async function okCb() {
        try{
        const {data} = await api.delete(`/endereco/${values.idEndereco}`)
        Notiflix.Notify.success('Endereço deletado');
        setTimeout(() =>{ document.location.reload()}, 1000);  
        
        }
        catch(error){
            console.log(error);
        }  
        },
        function cancelCb() {
            Notiflix.Notify.info('Nenhum endereço deletado');
        },
        {
          width: '420px',
          borderRadius: '8px',
        },);
      
  }
if(!arrayEndereço){
    return(<Loading />)
}
  return (
    <div className={style.bigContent}>
    <div className={style.secondHeader}>
        <h2>Endereços</h2>
        <SubHeader />
    </div>
      <div className={style.divDaLista}>
        <div className={style.headerTable}>
            <h2>Todos os endereços</h2>
            <ul>
                <li className={style.linkToAdd}><Link  to={'/address'}>Adicionar Endereço</Link></li>
                <li><a href=""><IoMdReturnLeft /> Filtrar</a></li>
                <li><a href=""><IoMdFunnel /> Ordenar</a></li>
            </ul>
        </div>
        <table className={style.mainTable}>
           <thead>
                <tr className={style.cabeçalhoTable}>
                    <th>Tipo</th>
                    <th>Cidade</th>
                    <th>Logradouro</th>
                    <th>Estado</th>
                    <th>Pais</th>   
                    <th>Atualizar / Remover</th>
{/* cep: "88080700"
cidade: "Florianópolis"
complemento: "casa"
estado: "SC"
idEndereco: 1
logradouro: "Rua José Dos Santos"
numero: 120
pais: "Brasil"
tipo: "RESIDENCIAL"
[[Prototype]]: Object */}
                </tr>
           </thead>
            {arrayEndereço && arrayEndereço.map((element:any,ind:any)=>(
                <tbody key={ind}>
                    <tr>
                    <th>
                        {element.tipo}
                    </th>
                    <th>
                        {element.cidade}
                    </th>
                    <th>
                        {element.logradouro}
                    </th>
                    <th>
                        {element.estado}
                    </th>
                    <th>
                        {element.pais}
                    </th>
                     <th>
                     <div  className={style.divFlex}>
                        <Link to={`/address/${element.idEndereco}`} onClick={()=>{setEndereco(element)}}> 
                            <div className={style.divEdit}>
                                <IoIosColorWand />
                            </div>
                        </Link> 
                        
                        <a onClick={()=>{removeEndereco(element)}} href="#">
                            <div  className={style.divRemove}>
                                <IoMdTrash /> 
                            </div>
                        </a>
                        
                    </div> 
                     </th>
                    </tr>
                    </tbody>
            ))}
            </table> 
      </div>
    </div>)
}

export default ListAddress