import styled from 'styled-components';

export const Container = styled.div`
    
    width: 100%;
    background-color: #EEE;
    justify-content: center;
    margin: 0 auto;
    min-height:950px ;
`;
export const Card = styled.div`
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #DFE0EB;
    padding: 10px;
    display: flex;
    flex-direction:column;
    text-align: center;
    height: 150px;
    width: 300px;
    margin-left: 20px;
`
export const CardTitle = styled.h1`
    color: #9FA2B4;
    font-size: 23px;
`
export const CardNumber = styled.h1`
    color: #252733;
    font-size: 60px;
    margin: 0;
`
export const CardsDisplay = styled.div`
    display: flex;
    margin: 90px 80px 30px 80px;
    justify-content: center;
`

export const DivAbout = styled.div`
    display: flex;
    background-color: white;
    margin-left: 144px;
    padding: 90px;
    width: 1167px;
    text-align:left;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid #DFE0EB;
    
`
export const PAbout = styled.p`
    font-size: 24px;
    color: #252733;
    font-weight: bold;
`

export const TextRight = styled.div`
   text-align: right;
`