import {FC , createContext , useState , useEffect , ReactNode} from 'react'
import { LoginDTO } from '../modal/LoginDTO'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { PessoasDTO } from '../modal/PessoasDTO'
import { EnderecoDTO } from '../modal/ContatoDTO'
import { EnderecoSwaggerDTO } from '../modal/ContatoDTO'
import { PessoaDTO } from '../modal/PessoaDTO'
import Notiflix from 'notiflix'
export const AuthContext = createContext({})

const AuthProvider:FC<ReactNode> = ({children}) => {
    const [isToken , setIsToken] = useState(false)
    const [loading , setLoading] = useState<boolean>(true)
    const [arrayPessoas , setArrayPessoas] = useState<PessoasDTO['pessoas']>()    
    const [objPessoa , setObjPessoa] = useState<PessoaDTO>({
        nome: '',
        email: '',
        cpf: '',
        dataNascimento: '',       
        })
    const [objEndereco , setObjEndereco] = useState<EnderecoDTO>({
        cep: '',
        logradouro: '',
        localidade: '',
        complemento:'',
        uf: '',
        pais: '',
        tipo: '',
        numero:''
    }
    )
    const [arrayEndereço , setArrayEndereço] = useState<EnderecoSwaggerDTO>()
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.common['Authorization'] = token
            setIsToken(true)
        }else{
            navigate('/login')
        }
        setLoading(false)
    },[])
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsToken(false)
        navigate('/login')
    }
    const handleLogin = async(user:LoginDTO) =>{
        //Funçao de logar e adicionar permissao ao usuario para fazer requests
        try{
            const {data} = await api.post('/auth' , user)
            setIsToken(true)
            setLoading(false)
            localStorage.setItem('token',data)
            api.defaults.headers.common['Authorization'] = data
            // alert('Logado com sucesso')
            navigate('/')
        }catch(error){
            console.log(error)
            setLoading(false)
            Notiflix.Notify.failure('Ops! ,Usuario ou senha inválido');
        }
    }
    const getInPessoa = async() =>{
        //get em todas as pessoas  
        try{
            const {data} = await api.get('/pessoa')
            setArrayPessoas(data)
        }catch(error){
            console.log(error)
        }
    }

    const getInEndereço = async()=>{
        //get em todos os endereços
        try{
            const {data} = await api.get('endereco')
            setArrayEndereço(data)

        }catch(error){
            console.log(error)
        }
    }

    if(loading){
        return(<h1>Loading</h1>)
    }


    return (
    <AuthContext.Provider value={{
        handleLogin,
        handleLogout,
        isToken,
        getInPessoa,
        arrayPessoas,
        setArrayEndereço,
        arrayEndereço,
        getInEndereço,
        objPessoa,
        setObjPessoa,
        objEndereco,
        setObjEndereco}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider