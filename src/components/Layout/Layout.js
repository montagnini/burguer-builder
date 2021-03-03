import React from 'react';
import styled from 'styled-components';

import Toolbar from '../Navigation/Toolbar/Toolbar';

const Main = styled.main`
    margin-top: 72px;
}
`;
const layout = props => {
    return (
    <>
            <Toolbar>
            </Toolbar>
            <Main>
                {props.children}
            </Main>
        </>
    )
}

export default layout;