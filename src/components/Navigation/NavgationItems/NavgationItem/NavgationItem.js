import React from 'react';
import styled from 'styled-components';

const NavgationItem = styled.li`
        margin: 10px 0;
        box-sizing: border-box;
        display: block;
        width: 100%;
    

    @media(min-width: 500px){
        margin: 0;
        box-sizing: border-box;
        display: flex;
        height: 100%;
        align-items: center;
    }
`;

const Link = styled.a`
        color: #8F5C2C;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display:block;
        transition: background-color 0.2s ease-in-out;

        &:hover, &:active, &.active{
            color: #40A4C8;
        }
    
    
    @media(min-width: 500px){
        color: white;
        text-decoration: none;
        height: 100%;
        padding: 16px 10px;
        border-bottom: 4px solid transparent;
        box-sizing: border-box;
        display:block;
        transition: background-color 0.4s ease-in-out;

        &:hover, &:active, &.active{
        background-color: #8F5C2C;
        border-bottom: 4px solid #40A4C8;
        color: white;
    }

    }
`;

const navgationItem = props => {
    return (
        <NavgationItem>
            <Link
                className={props.active ? "active" : null}
                href={props.link}>
                {props.children}
            </Link>
        </NavgationItem>
    );
}
export default navgationItem;