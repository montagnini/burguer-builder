import React from 'react';

import Button from '../../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'captalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });
    return (
        <>
            <h3> Your Order</h3>
            <p> A delicious burguer with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.totalPrice}</strong></p>
            <p> Continue to Checkout?</p>
            <Button btnType="Success" onClick={props.purchaseContinue}> CONTINUE </Button>
            <Button btnType="Danger" onClick={props.purchaseCancelled}> CANCEL </Button>

        </>);
}


export default orderSummary;