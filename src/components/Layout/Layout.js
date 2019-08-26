import React from 'react';

import './Layout.css';

const layout = (props) => (
    <>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className='Container'>
            {props.children}
        </main>
    </>
);

export default layout;