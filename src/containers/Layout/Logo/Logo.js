import React from 'react';
import styled from 'styled-components';

import burguerLogo from '../../../assets/images/burger-logo.png';

const Logo = styled.div`
    padding:8px;
    height: ${props => props.height || '80%'};
    background-color: ${props => props.background || "white"};
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: ${props => props.marginBottom || null};

`;

const logo = props => {
    return (
        <Logo  
            height={props.height} 
            background={props.background}
            marginBottom={props.marginBottom}>
            <img style={{ height: "100%" }} src={burguerLogo} alt="MyBurguer"></img>
        </Logo>);
}

export default logo;