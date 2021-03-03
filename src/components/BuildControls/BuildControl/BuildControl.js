import React from 'react';
import styled from 'styled-components';

const ControlDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
`;

const ControlLabel = styled.div`
    padding: 10px;
    font-weight: bold;
    width: 80px;
`;

const ControlButton = styled.button`
    display: block;
    font: inherit;
    padding: 5px;
    margin: 0 5px;
    width: 80px;
    border: 1px solid #AA6817;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s ease-in-out;

    &:disabled {
        background-color: #AC9980;
        border: 1px solid #7E7365;
        color: #ccc;
        cursor: default;
    };

    &:hover:disabled {
    background-color: #AC9980;
    color: #ccc;
    cursor: not-allowed;
    };

    &.less {  
    background-color: #D39952;
    color: white;
    };
    &.more {
    background-color: #8F5E1E;
    color: white;
    };

    &.less:hover, &.less:active {  
    background-color: #DAA972;
    color: white;
    }

    &.more:hover, &.more:active {
    background-color: #99703F;
    color: white;
    }
`;

const buildControl = props => {
    return (
        <ControlDiv>
            <ControlLabel>{props.label}</ControlLabel>
            <ControlButton className='more' onClick={props.add}> + </ControlButton>
            <ControlButton className='less' onClick={props.remove}> - </ControlButton>
        </ControlDiv>);
}

export default buildControl;