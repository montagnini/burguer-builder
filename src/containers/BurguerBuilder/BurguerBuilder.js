import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import Burguer from '../../components/Burguer/Burguer';
import BuilderControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/BuildControls/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';



const BurguerBuilder = props => {
    //Estado de ingredientes.
    const [ingredientsState, setIngredientsState] = useState(null);
    //Estado de preço total.
    const [totalPriceState, setTotalPriceState] = useState(4);
    //Estado de disponível para comprar.
    const [purchasableState, setPurchasableState] = useState(false);
    //Estado de 'comprando'.
    const [purchasingState, setPurchasingState] = useState(false);
    //Estado de carregando informações.
    const [loadingState, setLoadingState] = useState(false);
    //Estado de 'com erro'
    const [withErrorState, setWithErrorState] = useState(false);

    //Obtém a lista de ingredientes.
    useEffect(() => {
        //Obtém através do método get as informações de ingredientes.
        axios.get('https://react-burger-builder-2eb3b-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                //Define a lista de ingredientes no estado.
                setIngredientsState({ ...response.data });
            }).catch(error => {
                //Em caso de erro, define o estado 'com erro' para verdadeiro.
                setWithErrorState(true);
            });
    }, []);

    //Método para definir os novos ingredientes e os novos preços quando um uusário adiciona ou remove um ingrediente.
    const updatePurchaseState = (ingredients, price) => {
        //Obtém a lista de ingredientes.
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey].amount;
            }).reduce((sum, element) => {
                return sum + element;
            }, 0);
        //Define a lista de ingredientes como a nova lista obtida.
        setIngredientsState({ ...ingredients });
        //Define o preço total com o preço calculado.
        setTotalPriceState(price);
        //Define se habilita o botão para efetuar a compra.
        setPurchasableState(sum > 0);
    }

    //Método para adicionar um novo ingrediente.
    //type = Ingrediente a ser adicionado.
    const addIngredientHandler = type => {
        //Obtém os ingredientes. 
        const updatedIngredients = {
            ...ingredientsState
        }
        //Define a quantidade do ingrediente selecionado como a quantidade do ingrediente atual +1;
        updatedIngredients[type].amount = ingredientsState[type].amount + 1;
        //Obtém o novo valor através do preço total somando-se o valor do ingrediente selecionado.
        const newPrice = totalPriceState + updatedIngredients[type].value;
        //Atualiza os estados de acordo com o preço e a lista de ingredientes.
        updatePurchaseState(updatedIngredients, newPrice);
    }

    //Método para remover um ingrediente.
    //type = Ingrediente a ser removido.
    const removeIngredientHandler = type => {
        //Obtém a quantidade atual do ingrediente pelo tipo.
        const oldCount = ingredientsState[type].amount;
        //Caso a quantidade seja menor ou igual a 0, então o hamburguer não possui ingredientes.
        if (!oldCount <= 0) {
            //Pbtém os ingredientes.
            const updatedIngredients = {
                ...ingredientsState
            }
            //Defien a quantidade do ingrediente selecionado como a quantia do ingrediente atual -1;
            updatedIngredients[type].amount = oldCount - 1;
            //Obtém o novo valor calculando o preço total e retirando o preço do ingrediente selecionado.
            const newPrice = totalPriceState -  updatedIngredients[type].value;
            //Atualiza os estados de acordo com o preço e a lista de ingredientes.
            updatePurchaseState(updatedIngredients, newPrice);
        }
    };
    
    //Método para definir que o usuário está em estado 'comprando'.
    const purchaseHandler = () => {
        //Define o estado 'comprando' como verdadeiro.
        setPurchasingState(true);
    }
    
    //Método para definir que o usuário cancelou o estado 'comprando'.
    const purchaseCancelHandler = () => {
        //Define o estado 'comprando' como falso.
        setPurchasingState(false);
    }

    //Método continuar a compra.
    const purchaseContinueHandler = () => {
        //Define o estado 'carregando' como verdadeiro.
        setLoadingState(true);

        let ingredients = Object.keys(ingredientsState).map(igKey => {
            //Retorna um array 
            return [...Array(ingredientsState[igKey])].map((_,i) => {
                //Obtém se é pra exibir o controle de ingrediente na tela.
                return {type: igKey, amount: ingredientsState[igKey].amount}
            })
            //Transforma em objeto.
        }).reduce((prev, actual) => 
        {
            return prev.concat(actual);
        });
        
        console.log(ingredients)

        //Por enquanto define o pedido como os ingredientes e o preço definidos e adiciona um usuário estático.
        const order = {
            ingredients: ingredientsState,
            price: totalPriceState,
            costumer: {
                name: 'Zé Montagnini',
                addres: {
                    street: 'blabla',
                    zipCode: '8080808',
                    country: 'Brazil'
                },
                email: 'we.montagnini@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        //Através do método post, envia para o back o pedido.
        axios.post('/orders.json', order)
            //Obtém a resposta do servidor.
            .then(response => {
                //Define o estado de 'comprando' como falso.
                setPurchasingState(false);
                //Define o estado de 'carregando' como falso.
                setLoadingState(false);
            })
            //Obtém a resposta do servidor em caso de algum erro.
            .catch(error => {
                //Define o estado de 'comprando' como falso.
                setPurchasingState(false);
                //Define o estado de 'carregando' como falso.
                setLoadingState(false);
            });
    }
    //Define o conteúdo da modal como 'nulo'
    let modalContent = null;
    //Define o componente 'burger' de acordo com o estado de 'erro', caso esteja com erro, define uma mensagem na tela
    //em caso não esteja com erro, carrega o spinner informando ao usuário que a requisiçao está sendo carregada
    let burger = withErrorState ? <p>Ingredients can't be loaded </p> : <Spinner />;

    //Caso os ingredientes estejam carregados corretamente
    if (ingredientsState) {
        //Define a variável 'burger' como o conteúdo do hamburguer de fato.
        burger = (
            <>
                <Burguer ingredients={ingredientsState} />
                <BuilderControls
                    price={totalPriceState.toFixed(2)}
                    addIngredient={addIngredientHandler}
                    removeIngredient={removeIngredientHandler}
                    purchasable={purchasableState}
                    ordered={purchaseHandler}
                    ingredients={ingredientsState} />
            </>
        );
        //Define a variável 'modalContent' com o componente para finalizar a compra.
        modalContent = (<OrderSummary
            ingredients={ingredientsState}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            totalPrice={totalPriceState} />);
    }
    //Caso esteja com o estado 'carregando' ativo, exibe o spinner informando ao usuário que a requisição está sendo carregada.
    if (loadingState) {
        modalContent = <Spinner />;
    }
    //Retorna o componente.
    return (
        <>
            <Modal show={purchasingState}
                modalClosed={purchaseCancelHandler}>
                {modalContent}
            </Modal>
            {burger}
        </>
    );
}

//Caso ocorra algum erro na requisição, exibe a mensagem ao usuário utilizando o withErrorHandler.
export default withErrorHandler(BurguerBuilder, axios);


