import React, { useState } from 'react';
import styled from 'styled-components';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Main = styled.main`
    margin-top: 72px;
}
`;

const Layout = props => {
    const [state, setState] = useState({
        showSideDrawer: true
    });

    const sideDrawerClosedHandler = () => {
        setState({
            showSideDrawer: false
        });
    };

    const sideDrawerToggleHandler = () => {
        setState(prevState => ({
            showSideDrawer: !prevState.showSideDrawer
        }));
    }

    return (
        <>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                show={state.showSideDrawer}
                closed={sideDrawerClosedHandler} />
            <Main>
                {props.children}
            </Main>
        </>
    )
}

export default Layout;