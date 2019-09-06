import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';




const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        axios.get('https://react-my-burger-42f62.firebaseio.com/ingredients.json').then(response => {
            this.setState({ ingredients: response.data });
        });
    }

    updatePurchaseState = (ingredient) => {
        const sum = Object.keys(ingredient).map(igKey => {
            return ingredient[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient,
        })
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const oldCount = this.state.ingredients[type];
            const updatedCounted = oldCount - 1;
            const updatedIngredient = {
                ...this.state.ingredients
            };
            updatedIngredient[type] = updatedCounted;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredient,
            })
            this.updatePurchaseState(updatedIngredient);
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        //alert('You continue');

        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;



        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </>
            );
            orderSummary = (<OrderSummary
                totalAmmount={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
            );

        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);