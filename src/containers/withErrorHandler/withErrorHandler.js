import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [state, setState] = useState({
            error: null
        });

        useEffect(() => {
            axios.interceptors.request.use(req => {
                setState({ error: null });
                return req;
            })
             axios.interceptors.response.use(res => res, error => {
                setState({ error: error });
                return error;

            });

            console.log('testando');
        }, []);


        const errorConfirmedHandler = () => {
            setState({ error: null });
        }
        return (
            <>
                <Modal
                    show={state.error}
                    modalClosed={errorConfirmedHandler}>
                    {state.error ? state.error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    }
}


export default withErrorHandler;