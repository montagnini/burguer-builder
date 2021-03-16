import React from 'react';
import styled from 'styled-components';

import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const Burger = styled.div`
    background: #F5F5F5;
    width: 100%;
    margin: auto;
    height: 250px;
    overflow: auto;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem; 

    @media (min-width: 300px) and (max-height: 600px){
        height: 170px;
    }

    @media (min-width: 300px) and (min-height: 650px){
        height: 275px;
    }

    @media (min-width: 350px) and (min-height: 800px){
        height: 410px;
    }

    @media (min-width: 400px) and (min-height: 800px){
        height: 425px;
    }

    @media (min-width: 500px) and (min-height: 40px){
        width: 350px;
        height: 300px;
    }

    @media (min-width: 500px) and (min-height: 401px){
        width: 450px;
        height: 400px;
    }
    
    @media (min-width: 400px) and (max-width: 550px) and (max-height: 750px){
        height: 330px;
    }

    @media (min-width: 700px) and (min-height: 1000px){
        height: 625px;
    }

    @media (min-width: 1000px) and (min-height: 700px){
        width: 700px;
        height: 500px;
    }

    @media (min-width: 1000px) and (min-height: 1200px){
        height: 965px;
    }

    @media (min-width: 1500px) and (min-height: 1000px){
        width: 800px;
        height: 600px;
    }

    &::-webkit-scrollbar {
        display:none;
       
    }
`;

/**
 * Função que retorna o burger agrupando todos os ingredientes dinamicamente.
 * @param {*} props Propriedades recebidas pelo componente.
 * @returns Componente Burguer contendo lista de ingredientes.
 */
const burguer = props => {
    //Obtém lista de componentes de ingredientes através do parametro recebido.
    let ingredientsList = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey].amount)].map((_, i) => {
            return <BurguerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((prev, actual) => {
        return prev.concat(actual);
    }, []);

    //Caso a lista de ingredientes seja vazia, adiciona uma mensagem ao usuário.
    if (ingredientsList.length === 0) {
        ingredientsList = <h1> Please start adding ingredients!</h1>;
    }
    //Retorna o componente Burger contendo a lista de ingredientes ou uma mensagem solicitando adicionar ingredientes.
    return (
        <Burger>
            <BurguerIngredient type='bread-top' />
            {ingredientsList}
            <BurguerIngredient type='bread-bottom' />
        </Burger>
    );
};

export default burguer;