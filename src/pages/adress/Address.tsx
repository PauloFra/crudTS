
import { useContext ,useEffect , useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import api from '../../api';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { EnderecoDTO } from '../../modal/ContatoDTO';
import FotoDbc from '../../images/download.png'
import { useParams ,useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading';

import * as Yup from 'yup'
import Notiflix from 'notiflix';
import {
  DivLogo,
  DivError,
  DivCenter,
  InputForm,
  BotaoForm,
  TitleLogin,
  DivBeforeForm,
  ContainerLoginForSetUser
} from '../../CommunCss/Login.style'
import './Adress.css'

// interface EnderecoDTO {
//   cep: string;
//   logradouro: string;
//   bairro: string;
//   localidade: string;
//   complemento:string;
//   uf: string;
//   pais: string;
//   tipo: string;
//   numero: string
// }

   function Address() {  

    const {handleLogout , objEndereco} = useContext<any>(AuthContext)

    const {idEndereco} = useParams()
    const navigate = useNavigate()
    const [arrContato , setArrContato ] = useState<any>()
    
    const setup = async() => {
    //Get No Endereço especifico em base no id do useParams
      if(idEndereco){
          try{
            const {data} = await api.get(`endereco/${idEndereco}`)
        
            setArrContato(data)
          }
          catch(error){
            console.log(error)
            alert('Ops!')
          }
        }
    }

    async function BuscaCep(values:EnderecoDTO ,setFieldValue:any){
      //get na api do viaCep para adicionar os valores nos inputs via setFieldValue
      try{
        const {data} = await axios.get(`https://viacep.com.br/ws/${values.cep}/json/`);   
        setFieldValue('logradouro' , data.logradouro)
        setFieldValue('localidade' , data.localidade)
        setFieldValue('uf' , data.uf)
        
      }catch(error){
        console.log(error)
        Notiflix.Notify.warning('Ops!, CEP invalido');
      }
    }
    async function PostInEndereco(values:EnderecoDTO){
      let idPessoa = 658
      //Post na api do Maicon com os dados dos inputs

      const newAddress = {
        cep:values.cep.replaceAll('-' , ''),
        cidade: values.localidade,
        complemento:values.complemento,
        estado: values.uf,
        logradouro: values.logradouro,
        pais: values.pais,
        tipo: values.tipo,
        numero: parseInt(values.numero)
      }
     try{
      const {data} = await api.post(`endereco/${idPessoa}` , newAddress);
      console.log(data)
      Notiflix.Notify.success('Novo Endereço Criado!')
      setTimeout(() =>{ navigate('/list-address')}, 1500); 
      
     }catch(error){
      console.log(error);
      Notiflix.Notify.failure('Ops! , ocorreu algum erro');
     }
    }

    const atualizarEndereco = async(values:EnderecoDTO) => {
      //Update na api com os novos valores
      const newAddress = {
        idEndereco: idEndereco,
        cep:values.cep.replaceAll('-' , ''),
        cidade: values.localidade,
        complemento:values.complemento,
        estado: values.uf,
        logradouro: values.logradouro,
        pais: values.pais,
        tipo: values.tipo,
        numero: parseInt(values.numero)
      }
      try{
        const {data} = await api.put(`endereco/${idEndereco}` ,newAddress )
        console.log(data)
        Notiflix.Notify.success('Endereço Atualizado!')
        setTimeout(() =>{ navigate('/list-address')}, 1300); 
      }catch(error){
        console.log(error); 
        Notiflix.Notify.failure('Ops! , ocorreu algum erro');
      }
}    
  useEffect(()=>{
    setup()
  },[])
  // function handleUpdate(setFieldValue:any){
  //   setFieldValue( , arrContato.cep)
  // }
  
  if(idEndereco && !arrContato){
      return(<Loading />)
  }

  const SingupSchema = Yup.object().shape({
    cep:Yup.string()
    .min(2, 'Muito Curto')
    .required('Obrigatorio'),
    logradouro:Yup.string()
    .min(2, 'Muito Curto')
    .required('Obrigatorio'),
    localidade:Yup.string()
    .min(2, 'Muito Curto')
    .required('Obrigatorio'),
    uf:Yup.string()
    .min(1, 'Muito Curto')
    .max(2, 'Muito Longo')
    .required('Obrigatorio'),
    pais:Yup.string()
    .min(1, 'Muito Curto')
    .max(30, 'Muito Longo')
    .required('Obrigatorio'),
    complemento:Yup.string()
    .min(2, 'Muito Curto')
    .required('Obrigatorio'),
    numero:Yup.string()
    .required('Obrigatorio'),
  });
  return (
    <ContainerLoginForSetUser  className='divBg'>
      <DivCenter className='divMaior'>
      <DivLogo>
       <img src={FotoDbc} width="48" alt="" />
       <h1>Endereço</h1>
      </DivLogo>
      <TitleLogin>{idEndereco ?'Atualize o ' :'Adicione um Novo'} Endereço</TitleLogin>
      <p>Entre com os dados abaixo</p>
           
      <Formik 
       
        initialValues={ 
          idEndereco 
          ?
          {
            cep: arrContato.cep,
            logradouro: arrContato.logradouro,
            localidade: arrContato.cidade,
            uf: arrContato.estado,
            tipo: arrContato.tipo,
            pais: arrContato.pais,
            numero: arrContato.numero,
            complemento: arrContato.complemento
          }
          :
          {
            cep: '',
            logradouro: '',
            localidade: '',
            uf: '',
            tipo: 'RESIDENCIAL',
            pais: '',
            numero: '',
            complemento: ''
          }
        }
          validationSchema={SingupSchema}
         onSubmit={(
          values: EnderecoDTO,
          { setSubmitting }: FormikHelpers<EnderecoDTO>
        ) => {
         {idEndereco ? atualizarEndereco(values) : PostInEndereco(values)} 
        }}
      >
         {props =>(
        <Form >
            <DivBeforeForm>
          <label htmlFor="cep">CEP</label>
          <Field id="cep" name="cep" placeholder="Cep"  as={InputForm}/>
          {props.errors.cep && props.touched.cep ? (
                <DivError>{props.errors.cep}</DivError>
                ) : null} 
          <button className='btnConsultaCep' type='button' onClick={()=>BuscaCep(props.values , props.setFieldValue)}>Consulta Cep</button>
          
          <label htmlFor="logradouro">LOGRADOURO</label>
          <Field id="logradouro" name="logradouro" placeholder="Logradouro"  as={InputForm}/>
          {props.errors.logradouro && props.touched.logradouro ? (
                <DivError>{props.errors.logradouro}</DivError>
                ) : null} 
          <label htmlFor="localidade">LOCALIDADE</label>
          <Field id="localidade" name="localidade" placeholder="Localidade" as={InputForm} />
          {props.errors.localidade && props.touched.localidade ? (
                <DivError>{props.errors.localidade}</DivError>
                ) : null} 
          <label htmlFor="uf">UF</label>
          <Field id="uf" name="uf" placeholder="UF" as={InputForm}/>
          {props.errors.uf && props.touched.uf ? (
                <DivError>{props.errors.uf}</DivError>
                ) : null} 
          <label htmlFor="pais">PAIS</label>
          <Field id="pais" name="pais" placeholder="Pais"  as={InputForm}/>
          {props.errors.pais && props.touched.pais ? (
                <DivError>{props.errors.pais}</DivError>
                ) : null} 
          <label htmlFor="tipo">TIPO</label>
          <Field name="color" as="select"  >
            <option value="COMERCIAL">COMERCIAL</option>
            <option value="RESIDENCIAL">RESIDENCIAL</option>
          </Field>
          <label htmlFor="complemento">COMPLEMENTO</label>
          <Field id="complemento" name="complemento" placeholder="Complemento" as={InputForm} />  
          {props.errors.complemento && props.touched.complemento ? (
                <DivError>{props.errors.complemento}</DivError>
                ) : null} 
          <label htmlFor="numero">NUMERO</label>
          <Field id="numero" name="numero" placeholder="Numero da Residência"  as={InputForm}/>       
          {props.errors.numero && props.touched.numero ? (
                <DivError>{props.errors.numero}</DivError>
                ) : null} 
          <BotaoForm type="submit">{idEndereco ?'Atualizar' :'Adicionar'}</BotaoForm>
          </DivBeforeForm>
        </Form>
         )}
      </Formik>
      </DivCenter>
    </ContainerLoginForSetUser>
  )
}

export default Address