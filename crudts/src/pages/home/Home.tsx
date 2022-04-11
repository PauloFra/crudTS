import { useContext , useEffect , useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import api from '../../api'
import Loading from '../../components/Loading/Loading'
import { 
  Card,
  TextRight,
  PAbout,
  DivAbout,
  CardsDisplay,
  CardNumber,
  Container,
  CardTitle,
  
} from './Home.style'
function Home() {

  const [numerosTotais ,setNumerosTotais] = useState<number>()
  const [numerosTotaisUs ,setNumerosTotaisUs] = useState<number>()

  useEffect(()=>{
    getForGetNumber()
  },[])
const getForGetNumber = async() =>{
        try{
            const {data} = await api.get('pessoa')
            setNumerosTotais(data.length)
        }
        catch(error){
            console.log(error);    
        }

        try{
            const {data} = await api.get('endereco')  
            setNumerosTotaisUs(data.length)         
        }
        catch(error){
            console.log(error);            
        }
    }
  if(!numerosTotais){
    return(
      <Loading/>
    )
  }

  if(!numerosTotaisUs)
  return(
    <Loading/>
  )
   return (
    <Container>
     <CardsDisplay>
     <Card>
        <CardTitle>
          Total De Usuarios
        </CardTitle>
        <CardNumber>{numerosTotais}</CardNumber>
      </Card>
      <Card>
        <CardTitle>
        Total De Endereços
        </CardTitle>
        <CardNumber>{numerosTotaisUs}</CardNumber>
      </Card> 
      <Card>
        <CardTitle>
        
        </CardTitle>
        <CardNumber></CardNumber>
      </Card> 
      <Card>
        <CardTitle>
        
        </CardTitle>
        <CardNumber></CardNumber>
      </Card> 
     </CardsDisplay>
     <DivAbout>
      <CardTitle>Sobre Nós</CardTitle>
      <PAbout>Nada se constrói sozinho é preciso parceria, sinergia, dividir e compartilhar os sonhos. É preciso estar próximo. O sucesso da DBC é fruto de um trabalho coletivo, de uma maturidade ímpar de nossos colaboradores. Por isso, aqui eles são os protagonistas!</PAbout>
     <CardTitle>Vem Ser</CardTitle>
      <PAbout>
        Somos especialistas em soluções de desenvolvimento customizado de sistemas. A premissa do nosso trabalho integra usabilidade, design e performance no desenvolvimento em todas as plataformas líderes de mercado.
      </PAbout>
    </DivAbout>
    
    </Container>
  )
}

export default Home