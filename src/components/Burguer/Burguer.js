import React from 'react';
import styled from 'styled-components';

import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const Burguer = styled.div`
     width: 100%;
    margin: auto;
    height: 250px;
    overflow: auto;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;

    @media (min-width: 500px) and (min-height: 40px){
        width: 350px;
        height: 300px;
    }

    @media (min-width: 500px) and (min-height: 401px){
        width: 450px;
        height: 400px;
    }

    @media (min-width: 1000px) and (min-height: 700px){
        width: 700px;
        height: 600px;
    }
`;

const burguer = props => {
    let ingredientsList = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurguerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((prev, actual) => {
        return prev.concat(actual);
    }, []);

    if (ingredientsList.length === 0) {
        ingredientsList = <h1> Please start adding ingredients!</h1>;
    }
    return (<Burguer>
        <BurguerIngredient type='bread-top' />
        {ingredientsList}
        <BurguerIngredient type='bread-bottom' />
    </Burguer>
    );
};

export default burguer;