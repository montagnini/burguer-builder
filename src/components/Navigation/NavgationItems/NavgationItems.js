import React from 'react';
import styled from 'styled-components';

import NavgationItem from './NavgationItem/NavgationItem';

const NavgationItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    height: 100%;
    flex-flow: column;

    @media(min-width: 500px){
        flex-flow: row;
    }
`;

const navgationItems = props => {
    return (
        <NavgationItems>
            <NavgationItem link="/" active> Burguer Builder </NavgationItem>
            <NavgationItem link="/"> Checkout </NavgationItem>
        </NavgationItems>);
}
export default navgationItems;