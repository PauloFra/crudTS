
import { useContext , useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { PessoasDTO } from '../../modal/PessoasDTO';
import Loading from '../../components/Loading/Loading';
import ListaUsers from '../../components/ListaUsers/ListaUsers';
function Users() {
  const {getInPessoa , arrayPessoas} = useContext<any>(AuthContext);
  useEffect(()=>{
    getInPessoa()
  },[])
  console.log(arrayPessoas);
  if(!arrayPessoas){
    return(<Loading />)
  }
  return (
  <div>
    <ListaUsers pessoas={arrayPessoas}/> 
  </div>
  )
}

export default Users