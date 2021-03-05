import React from 'react';
import styled from 'styled-components';

import Logo from '../../../containers/Layout/Logo/Logo';
import NavgationItems from '../NavgationItems/NavgationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = styled.header`
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #703B09;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;
    
`;

const Nav = styled.nav`
    @media(max-width: 499px){
        display: none;
    }
`;



const toolbar = props => {
    return (
        <Toolbar>
            <DrawerToggle onClick={props.drawerToggleClicked}/>
            <Logo />
            <Nav>
                <NavgationItems/>
            </Nav>
        </Toolbar>
    );
}
export default toolbar;