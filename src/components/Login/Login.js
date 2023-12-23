import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{
  if (action.type === 'USER_INPUT'){
    return {value : action.value, isValid : action.value.includes('@')};
  }
  if (action.type === 'USER_BLUR'){
    return {value : state.value, isValid : state.value.includes('@')};
  }
  return { value: '', isValid : false}
}  


const passReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value : action.value, isValid : action.value.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value : state.value, isValid : state.value.trim().length > 6};
  }
  return { value: '', isValid : false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null});
  const [passState, dispatchpass] = useReducer(passReducer, { value: '', isValid: null});
  

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', value: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && passState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchpass({type:'USER_INPUT', value: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchpass({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
