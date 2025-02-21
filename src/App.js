import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {authenticate} from './store/actions/auth'

import './App.css';
import Header from './components/Header';

function App(props) {

  console.log(props)
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();
  useEffect(()=>{
    const checkUser = async () => {
        const userData = localStorage.getItem("user")
        const user = JSON.parse(userData)
        if(user){
            if(+user.expiry < Date.now()){
                setIsLoading(false)
                return
            }
            else{
                await dispatch(authenticate(user))
                setIsLoading(false)
            }
        }
        else{
          setIsLoading(false)
        }
    }
    setIsLoading(true)
    checkUser()

  }, [dispatch])

  if(isLoading){
    return(
        <div style={{height:"100%", width:"100%"}}>
            <div className="loader">Loading...</div>
        </div>
    )
  }

  return (
    <>
    <Header history={props.history}/>
    {props.children}
    </>
  );
}

export default App;
