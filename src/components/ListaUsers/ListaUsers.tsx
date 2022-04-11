import { useContext } from 'react';
import style from '../../CommunCss/tableList.module.css'
import SubHeader from '../SubHeader/SubHeader';
import { PessoasDTO } from '../../modal/PessoasDTO'
import { Link } from 'react-router-dom';
import api from '../../api';
import { PessoaDTO } from '../../modal/PessoaDTO';
import Notiflix from 'notiflix';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../context/AuthContext';
import { 
    IoIosColorWand,
    IoMdTrash,
    IoMdFunnel,
    IoMdReturnLeft

} from "react-icons/io";
import moment from 'moment';
import { formatCpf } from '../../Utils';
// moment(arr.dataNascimento ,'YYYY-MM-DD' ).format('DD/MM/YYYY');
function ListaUsers({pessoas}:PessoasDTO) {
    const {objPessoa , setObjPessoa ,getInPessoa} = useContext<any>(AuthContext)

    function setPessoa(values:any){
        setObjPessoa(values)
        
    }
  
    const removePessoa = async(values:PessoaDTO) =>{
        Notiflix.Confirm.show(
            'Excluir Usuario',
            `Tem certeza que deseja excluir ${values.nome} da lista de usuarios ?`,
            'Sim',
            'Não',
            async function okCb() {
                try{
                    const {data} = await api.delete(`/pessoa/${values.idPessoa}`)
                    Notiflix.Notify.success('Usuario deletado');
                    getInPessoa(); 
             }
                catch(error){
                    console.log(error)
                }
            },
            function cancelCb() {
                Notiflix.Notify.info('Nenhum usuario deletado');
            },
            {
              width: '420px',
              borderRadius: '8px',
            },);
       
    }
    
  return (
    <>
    <div className={style.bigContent}>
    <div className={style.secondHeader}>
        <h2>Usuarios</h2>
        <SubHeader />
    </div>
      <div className={style.divDaLista}>
        <div className={style.headerTable}>
            <h2>Todos os usuarios</h2>
            
            <ul>
                <li  className={style.linkToAdd}><Link to={'/set-users'}>Adicionar Usuario</Link></li>
                <li><a href=""><IoMdReturnLeft /> Filtrar</a></li>
                <li><a href=""><IoMdFunnel /> Ordenar</a></li>
            </ul>
        </div>
        <table className={style.mainTable}>
           <thead>
                <tr className={style.cabeçalhoTable}>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Data de Nascimento</th>
                    <th>Atualizar / Remover</th>
                </tr>
           </thead>
            {pessoas.map((pessoa,ind)=>(
                <tbody key={ind}>              
                <tr>
                <th>    
                    {pessoa.nome}
                </th>    
                <th>  
                    {pessoa.email}
                </th>
                <th>
                    {formatCpf(pessoa.cpf)}
                </th>
                <th>
                    {moment(pessoa.dataNascimento ,'YYYY-MM-DD' ).format('DD/MM/YYYY')}
                </th>
                <th className={style.textCenter}>
                    <div  className={style.divFlex}>
                        <Link to={`/set-users/${pessoa.idPessoa}/`} onClick={() => setPessoa(pessoa)}> 
                            <div className={style.divEdit}>
                                <IoIosColorWand />
                            </div>
                        </Link> 

                        <a onClick={()=>{removePessoa(pessoa)}} href="#">
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
    </div>
    </>
  )
}

export default ListaUsers