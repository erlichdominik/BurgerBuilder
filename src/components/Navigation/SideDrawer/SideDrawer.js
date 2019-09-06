import React from 'react';
import Logo from '../../Logo/Logo';

import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    // ...
    let attachedClasses = ['SideDrawer', 'Close'];
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo height='10%' />
                <nav>

                    <NavigationItems />
                </nav>
            </div>
            <Backdrop />
        </>
    );
}

export default sideDrawer;