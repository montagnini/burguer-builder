import React from 'react';
import PropTypes from 'prop-types';

import './BurguerIngredient.css';



const burguerIngredient = props => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className='BreadBottom' />;
            break;
        case ('bread-top'):
            ingredient = (
                <div className='BreadTop'>
                    <div className='Seeds1' />
                    <div className='Seeds2' />
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className='Meat'></div>;
            break;
        case ('cheese'):
            ingredient = <div className='Cheese'></div>;
            break;
        case ('salad'):
            ingredient = <div className='Salad'></div>;
            break;
        case ('bacon'):
            ingredient = <div className='Bacon'></div>;
            break;
        default:
            ingredient = null;
            break;

    }
    return (ingredient);
}

burguerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default burguerIngredient;