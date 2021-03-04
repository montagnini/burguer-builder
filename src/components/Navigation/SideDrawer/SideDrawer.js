import React from 'react';
import styled from 'styled-components';

import Logo from '../../Layout/Logo/Logo';
import NavgationItems from '../NavgationItems/NavgationItems';


const SideDrawer = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3 ease-in-out;

    @media(min-width: 500px){
        display: none;
    }

    &.Open{
        transform: translateX(0);
    }

    &.Close{
        transform: translateX(-100%);
    }

`;

const sideDrawer = props => {
    return (
        <SideDrawer >
            <Logo height='11%' marginBottom=''/>
            <nav style={{ height: '100%' }}>
                <NavgationItems />
            </nav>
        </SideDrawer>
    );
}

export default sideDrawer;