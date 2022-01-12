import React, { useReducer } from 'react';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

function reducer(state,action){
    return{
        ...state,
        [action.type]: {value: action.payload, error: action.error}
    };
}

function emailValidator(email){
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? true : false;
}

export default () => {
    const [state,dispatch] = useReducer(reducer, initialState);

    function handleChange(e) {
        const {name,value} = e.target;
        if(['firstName', 'lastName'].indexOf(name) != -1){
            if(value.length <= 0){
                dispatch ({
                    type: name,
                    payload: value,
                    error: null
                });
            } else if (value.length < 2){
                dispatch ({
                    type: name,
                    payload: value,
                    error: 'err'
                });
            } else {
                dispatch ({
                    type: name,
                    payload: value,
                    error: null
                });
            }
        }
        if(['email'].indexOf(name) != -1){
            if(value.length <= 0){
                dispatch ({
                    type: name,
                    payload: value,
                    error: null
                });
            } else if (emailValidator(value)){
                dispatch ({
                    type: name,
                    payload: value,
                    error: null
                });
            } else {
                dispatch ({
                    type: name,
                    payload: value,
                    error: 'err'
                });
            }
        }
    }


    const flashError = (err) => {
        if(err === 'firstName' && state.firstName.error != null){
            return <p>First name must be longer than 2 characters.</p>
        }
        if(err === 'lastName' && state.lastName.error != null){
            return <p>Last name must be longer than 2 characters.</p>
        }
        if(err === 'email' && state.email.error != null){
            return <p>Invalid Email.</p>
        }
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <label>
                    <span>First Name:</span>{' '}
                    <input
                        name = 'firstName'
                        value = {state.firstName.value}
                        onChange = {handleChange}
                    />
                    {flashError('firstName')}
                </label>
            </div>
            <div>
                <label>
                    <span>Last Name:</span>{' '}
                    <input
                        name = 'lastName'
                        value = {state.lastName.value}
                        onChange = {handleChange}
                    />
                    {flashError('lastName')}
                </label>
            </div>
            <div>
                <label>
                    <span>Email:</span>{' '}
                    <input
                        name = 'email'
                        value = {state.email.value}
                        onChange = {handleChange}
                    />
                    {flashError('email')}
                </label>
            </div>
        </div>
    );
}