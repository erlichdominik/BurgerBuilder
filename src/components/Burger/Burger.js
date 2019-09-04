import React from 'react';

import './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transofrmedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transofrmedIngredients.length === 0) {
        transofrmedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className className='Burger'>
            <BurgerIngredient type="bread-top" />
            {transofrmedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;