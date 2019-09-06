import React from 'react';

import './Order.css';

const order = (props) => {

    return (
        <div className='Order'>
            <div>
                Ingredients:
                {Object.keys(props.ingredients).map((key, id) => {
                    return <p style={{
                        padding: '8px',
                        margin: '0 5px',
                    }} key={id}>{key} <strong>({props.ingredients[key]})</strong></p>
                })}
            </div>
            <p>
                Price: <strong>{Number(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
}


export default order;