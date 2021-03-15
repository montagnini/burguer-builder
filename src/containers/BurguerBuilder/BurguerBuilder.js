import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import Burguer from '../../components/Burguer/Burguer';
import BuilderControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/BuildControls/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const BurguerBuilder = props => {

    const [state, setState] = useState({
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    });

    useEffect(() => {
        axios.get('https://react-burger-builder-2eb3b-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                setState(prevState => ({
                    ...prevState,
                    ingredients: response.data
                }))
            }).catch(error => {
                setState(prevState => ({
                    ...prevState,
                    error: true
                }));
            });
    },[]);


    const purchaseHandler = () => {
        setState(prevState => ({
            ...prevState,
            purchasing: true
        }));
    }

    const updatePurchaseState = (ingredients, price) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, element) => {
                return sum + element;
            }, 0);
        setState(prevState => ({
            ...prevState,
            ingredients: ingredients,
            totalPrice: price,
            purchasable: sum > 0
        }));
    }

    const addIngredientHandler = type => {
        const oldCount = state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        updatePurchaseState(updatedIngredients, newPrice);
    }

    const removeIngredientHandler = type => {
        const oldCount = state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        updatePurchaseState(updatedIngredients, newPrice);
    };

    const purchaseCancelHandler = () => {
        setState(prevState => ({
            ...prevState,
            purchasing: false
        }));
    }

    const purchaseContinueHandler = () => {

        setState(prevState => ({
            ...prevState,
            loading: true
        }));

        const order = {
            ingredients: state.ingredients,
            price: state.totalPrice,
            costumer: {
                name: 'Wellington Montagnini',
                addres: {
                    street: 'blabla',
                    zipCode: '8080808',
                    country: 'Brazil'
                },
                email: 'we.montagnini@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(state);
                setState(prevState => ({
                    ...prevState,
                    purchasing: false,
                    loading: false
                }));
            })
            .catch(error => {
                setState(prevState => ({
                    ...prevState,
                    purchasing: false,
                    loading: false
                }));
            });
        console.log(state);
    }
    let modalContent = null;
    let burger = state.error? <p>Ingredients can't be loaded </p> : <Spinner />;

    if (state.ingredients) {
        burger = (
            <>
                <Burguer ingredients={state.ingredients} />
                <BuilderControls
                    price={state.totalPrice.toFixed(2)}
                    addIngredient={addIngredientHandler}
                    removeIngredient={removeIngredientHandler}
                    purchasable={state.purchasable}
                    ordered={purchaseHandler}
                    ingredients={state.ingredients} />
            </>
        );

        modalContent = (<OrderSummary
            ingredients={state.ingredients}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            totalPrice={state.totalPrice.toFixed(2)} />);
    }


    if (state.loading) {
        modalContent = <Spinner />;
    }

    return (
        <>
            <Modal show={state.purchasing}
                modalClosed={purchaseCancelHandler}>
                {modalContent}
            </Modal>
            {burger}
        </>
    );
}

export default withErrorHandler(BurguerBuilder, axios);


