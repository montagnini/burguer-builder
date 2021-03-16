import React from 'react';
import styled from 'styled-components';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad', value: 0 },
    { label: 'Bacon', type: 'bacon', value: 0 },
    { label: 'Cheese', type: 'cheese', value: 0 },
    { label: 'Meat', type: 'meat', value: 0 },
];

const BuildControls = styled.footer`
    width: 100%;
    background-color: #CF8F2E;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 2px 1px #ccc;
    margin: auto;
    padding: 10px 0;
`;

const OrderButton = styled.button`
    background-color: #DAD735;
    outline: none;
    cursor: pointer;
    border: 1px solid #966909;
    color: #966909;
    font-family:inherit;
    font-size: 1.2em;
    padding: 15px 30px;
    box-shadow: 2px 2px 2px #966909;

    &:hover, &:active{
        background-color: #A0DB41;
        border: 1px solid #966909;
        color: #966909;
    }

    &:disabled{
        background-color: #C7C696;
        cursor: not-allowed;
        border: 1px solid #ccc;
        color: #888888;
    }
`;
const buildControls = props => {
    //Obtém lista de ingredientes
    let listOfControls = Object.keys(props.ingredients).map(igKey => {
        //Retorna um array 
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            //Obtém se é pra exibir o controle de ingrediente na tela.
            return props.ingredients[igKey].show ?
            <BuildControl 
                    key={props.ingredients[igKey].label}
                    label={props.ingredients[igKey].label}
                    amount={props.ingredients[igKey].amount}
                    price={props.ingredients[igKey].value}
                    add={() => props.addIngredient(igKey)}
                    remove={() => props.removeIngredient(igKey)} />
            : null;
        })
        //Transforma em objeto.
    }).reduce((prev, actual) => {
        return prev.concat(actual);
    },[]);
    
    return (
        <BuildControls>
            <p>Current Price: <strong>${props.price}</strong></p>          
            { listOfControls}
            <OrderButton
                disabled={!props.purchasable}
                onClick={props.ordered}>
                Order Now
            </OrderButton>
        </BuildControls>
    );
}

export default buildControls;
