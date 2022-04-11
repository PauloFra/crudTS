import styled from "styled-components";

export const ContainerLogin = styled.div`
    display: flex;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    background-color: #333;
    justify-content: center;
    min-height: 937px;
    width: 100%;
    align-items: center;
    font-weight:bold;
    color:#898989 ;
    
    
    
`
export const TitleLogin = styled.h1`
    font-size: 40px;
    color: #333;
    margin-bottom: 0;
`
export const DivForm = styled.div`
    font-size: 30px;
    color: #DFE0EB;
    
    
`
export const DivBeforeForm = styled.div`
    display: grid;
    text-align: left;
    gap: 10px 0;
    margin: 30px 0;
    color: #9FA2B4;
   
`
export const InputForm = styled.input`
    height: 42px;
    font-size: 19px;
    padding-left: 15px;
    border-radius: 8px;
    color: #9FA2B4;
    border: 1px solid #DFE0EB;
    outline-color: #DFE0EB;
    ::placeholder{
        color: #9FA2B4;
    }

`
export const DivCenter = styled.div`
   background-color: white;
   width: 380px;
   padding: 30px;
   border-radius: 8px;
`
export const DivLogo = styled.div`
    font-size: 19px;
    margin-top: 15px;
`
export const BotaoForm = styled.button`
    font-size: 20px;
    background-color: #3751FF;
    color: white;
    border: none;
    height: 53px;
    margin: 10px 0;
    border-radius: 6px;
    transition: 1s;
    :hover  {
    background-color: #2c3ca9;
    transition: 1s;
  }
`
export const BtnChangeType = styled.a`
   position: absolute;
   margin:130px 0 0 350px;
   background-color: transparent;
   border: transparent;
   font-size: 20px;
   transition: 1s;
   :hover{
       color: blue;
       transition: 1s;
    }
`
export const ContainerLoginForSetUser = styled.div`
    display: flex;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    background-color: #F7F8FC;
    justify-content: center;
    min-height: 100%;
    width: 1618px;
    align-items: center;
    font-weight:bold;
    color:#898989 ;
`
export const DivCenterForUser = styled.div`
   background-color: white;
   padding: 30px;
   border-radius: 8px;

   width: 60% ;
   margin: 120px 0;
   border: 1px solid #9FA2B4;
`
export const LinkDefault = styled.a`
  text-decoration: none;
  color: #2c3ca9;
  :hover{
    text-decoration: underline;
  }
`
export const DivError = styled.div`
   color: #ff4444;
`