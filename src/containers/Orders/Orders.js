import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                console.log(response.data);
                const fetchedOrders = [];
                for (let key in response.data) {
                    // console.log(response.data[key]);
                    fetchedOrders.push(response.data[key]);
                }
                this.setState({ loading: false, orders: fetchedOrders });
                console.log(this.state.orders);
            }).catch(response => {
                this.setState({ loading: false, });
            })
    }


    render() {

        return (
            <div>
                {this.state.orders.map((el, id) => {
                    return <Order
                        key={id}
                        ingredients={el.ingredient}
                        price={el.price} />;
                })}
            </div>
        );
    }
}

export default Orders;